import nodemailer from 'nodemailer';
import { 
  AppError, 
  ValidationError,
  ExternalServiceError,
  asyncHandler,
  validateRequired,
  validateEmail,
  logError
} from '../middleware/errorHandler.js';

// Email configuration
const createEmailTransporter = () => {
  try {
    return nodemailer.createTransporter({
      host: 'smtpout.secureserver.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || 'noreply@aeronomy.com',
        pass: process.env.EMAIL_PASS || 'your-email-password'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  } catch (error) {
    logError(error);
    throw new ExternalServiceError('Email service configuration failed');
  }
};

// Verify email transporter
const verifyEmailService = async () => {
  try {
    const transporter = createEmailTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    console.warn('⚠️  Email service not configured properly:', error.message);
    return false;
  }
};

// Generate enhanced email template
const generateDemoEmailTemplate = (data) => {
  const { fullName, email, organizationName, role, message, timestamp } = data;
  
  return {
    subject: `🚀 Demo Request from ${organizationName} | Aeronomy Platform`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .field { margin: 15px 0; padding: 10px; background: #f8f9fa; border-left: 4px solid #667eea; }
          .field strong { color: #667eea; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .priority { background: #fff3cd; border-left-color: #ffc107; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Demo Request</h1>
            <p>Aeronomy Platform - Sustainable Aviation Fuel Solutions</p>
          </div>
          <div class="content">
            <div class="field priority">
              <strong>⏰ Timestamp:</strong> ${timestamp}
            </div>
            <div class="field">
              <strong>👤 Full Name:</strong> ${fullName}
            </div>
            <div class="field">
              <strong>📧 Email:</strong> ${email}
            </div>
            <div class="field">
              <strong>🏢 Organization:</strong> ${organizationName}
            </div>
            <div class="field">
              <strong>💼 Role:</strong> ${role}
            </div>
            <div class="field">
              <strong>💬 Message:</strong><br>
              <div style="margin-top: 10px; padding: 15px; background: white; border-radius: 5px; border: 1px solid #e9ecef;">
                ${message || 'No additional message provided.'}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>This email was generated automatically by the Aeronomy Platform demo request system.</p>
            <p>Please respond promptly to maintain customer engagement.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Demo Request - Aeronomy Platform
      =====================================
      
      Timestamp: ${timestamp}
      Full Name: ${fullName}
      Email: ${email}
      Organization: ${organizationName}
      Role: ${role}
      
      Message:
      ${message || 'No additional message provided.'}
      
      ---
      This email was generated automatically by the Aeronomy Platform.
    `
  };
};

// @desc    Handle demo request
// @route   POST /api/demo/request
// @access  Public
export const submitDemoRequest = asyncHandler(async (req, res) => {
  const { fullName, email, organizationName, role, message } = req.body;

  // Validate required fields
  validateRequired({ fullName, email, organizationName, role });
  
  // Validate email format
  validateEmail(email);
  
  // Validate field lengths
  if (fullName.length > 100) {
    throw new ValidationError('Full name must be less than 100 characters');
  }
  
  if (organizationName.length > 100) {
    throw new ValidationError('Organization name must be less than 100 characters');
  }
  
  if (role.length > 100) {
    throw new ValidationError('Role must be less than 100 characters');
  }
  
  if (message && message.length > 1000) {
    throw new ValidationError('Message must be less than 1000 characters');
  }

  const timestamp = new Date().toISOString();
  const demoData = {
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    organizationName: organizationName.trim(),
    role: role.trim(),
    message: message ? message.trim() : '',
    timestamp
  };

  try {
    // Check if email service is available
    const isEmailServiceAvailable = await verifyEmailService();
    
    if (isEmailServiceAvailable) {
      const transporter = createEmailTransporter();
      const emailTemplate = generateDemoEmailTemplate(demoData);
      
      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'noreply@aeronomy.com',
        to: process.env.DEMO_EMAIL || 'demo@aeronomy.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text
      });
      
      console.log(`✅ Demo request email sent: ${demoData.email} (${demoData.organizationName})`);
    } else {
      console.log(`📝 Demo request logged (email service unavailable): ${demoData.email} (${demoData.organizationName})`);
    }

    res.status(200).json({
      success: true,
      message: 'Demo request submitted successfully! We will contact you soon.',
      data: {
        submittedAt: timestamp,
        status: isEmailServiceAvailable ? 'email_sent' : 'logged',
        contactInfo: {
          email: demoData.email,
          organization: demoData.organizationName
        }
      }
    });

  } catch (error) {
    // Log the error but don't fail the request
    logError(error);
    console.error('❌ Demo request email failed:', error.message);
    
    // Still return success since we received the request
    console.log(`📝 Demo request logged (email failed): ${demoData.email} (${demoData.organizationName})`);
    
    res.status(200).json({
      success: true,
      message: 'Demo request received! We will contact you soon.',
      data: {
        submittedAt: timestamp,
        status: 'logged',
        contactInfo: {
          email: demoData.email,
          organization: demoData.organizationName
        }
      }
    });
  }
});

// @desc    Health check for demo service
// @route   GET /api/demo/health
// @access  Public
export const healthCheck = asyncHandler(async (req, res) => {
  const isEmailServiceAvailable = await verifyEmailService();
  
  res.json({
    success: true,
    data: {
      status: 'Demo service running',
      emailService: isEmailServiceAvailable ? 'Available' : 'Unavailable',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
  });
}); 