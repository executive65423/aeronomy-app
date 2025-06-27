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

// Enhanced email configuration for Railway production
const createEmailTransporter = () => {
  try {
    // Railway production configuration
    const emailConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
      }
    };

    // Log configuration status (without sensitive data)
    console.log('📧 Email configuration status:', {
      host: emailConfig.host ? '✅ Set' : '❌ Missing',
      port: emailConfig.port,
      secure: emailConfig.secure,
      user: emailConfig.auth.user ? '✅ Set' : '❌ Missing',
      password: emailConfig.auth.pass ? '✅ Set' : '❌ Missing',
      environment: process.env.NODE_ENV || 'development'
    });

    return nodemailer.createTransport(emailConfig);
  } catch (error) {
    console.error('❌ Email transporter creation failed:', error.message);
    logError(error);
    throw new ExternalServiceError('Email service configuration failed');
  }
};

// Enhanced email service verification
const verifyEmailService = async () => {
  try {
    // Check if required environment variables are present
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.SMTP_HOST) {
      console.warn('⚠️  Email service not configured - missing environment variables');
      return false;
    }

    const transporter = createEmailTransporter();
    await transporter.verify();
    console.log('✅ Email service verified successfully');
    return true;
  } catch (error) {
    console.warn('⚠️  Email service verification failed:', error.message);
    return false;
  }
};

// Enhanced email template with production-ready styling
const generateDemoEmailTemplate = (data) => {
  const { fullName, email, organizationName, role, message, timestamp } = data;
  
  return {
    subject: `🚀 URGENT: Demo Request from ${organizationName} | Aeronomy Platform`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Demo Request - Aeronomy Platform</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
          }
          .content { 
            padding: 40px 30px;
          }
          .field { 
            margin: 20px 0; 
            padding: 16px; 
            background: #f8f9fa; 
            border-left: 5px solid #667eea;
            border-radius: 0 8px 8px 0;
          }
          .field strong { 
            color: #667eea; 
            font-weight: 600;
            display: block;
            margin-bottom: 8px;
          }
          .field-value {
            font-size: 16px;
            line-height: 1.5;
          }
          .priority { 
            background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); 
            border-left-color: #f39c12;
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          .message-box {
            margin-top: 15px; 
            padding: 20px; 
            background: white; 
            border-radius: 8px; 
            border: 2px solid #e9ecef;
            font-style: italic;
          }
          .footer { 
            background: #f8f9fa;
            padding: 30px;
            text-align: center; 
            color: #666; 
            font-size: 14px; 
            border-top: 1px solid #e9ecef;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            transition: transform 0.2s;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
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
              <strong>⏰ Request Time:</strong>
              <div class="field-value">${new Date(timestamp).toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</div>
            </div>
            <div class="field">
              <strong>👤 Contact Person:</strong>
              <div class="field-value">${fullName}</div>
            </div>
            <div class="field">
              <strong>📧 Email Address:</strong>
              <div class="field-value"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></div>
            </div>
            <div class="field">
              <strong>🏢 Organization:</strong>
              <div class="field-value">${organizationName}</div>
            </div>
            <div class="field">
              <strong>💼 Position/Role:</strong>
              <div class="field-value">${role}</div>
            </div>
            <div class="field">
              <strong>💬 Message/Requirements:</strong>
              <div class="message-box">
                ${message || 'No additional message provided.'}
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}?subject=Re: Demo Request - Aeronomy Platform&body=Hi ${fullName}," class="cta-button">
                📧 Reply to Customer
              </a>
            </div>
          </div>
          <div class="footer">
            <p><strong>⚡ Action Required:</strong> Please respond within 24 hours to maintain high customer satisfaction.</p>
            <p>This email was generated automatically by the Aeronomy Platform demo request system.</p>
            <p><small>Environment: ${process.env.NODE_ENV || 'development'} | Timestamp: ${timestamp}</small></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      NEW DEMO REQUEST - AERONOMY PLATFORM
      =====================================
      
      🚨 URGENT: Please respond within 24 hours
      
      Request Time: ${new Date(timestamp).toLocaleString()}
      Contact Person: ${fullName}
      Email: ${email}
      Organization: ${organizationName}
      Role: ${role}
      
      Message/Requirements:
      ${message || 'No additional message provided.'}
      
      =====================================
      Next Steps:
      1. Reply to customer within 24 hours
      2. Schedule demo call
      3. Send follow-up materials
      
      Reply directly to: ${email}
      
      ---
      This email was generated automatically by the Aeronomy Platform.
      Environment: ${process.env.NODE_ENV || 'development'}
      Timestamp: ${timestamp}
    `
  };
};

// Enhanced demo request handler with production optimizations
export const submitDemoRequest = asyncHandler(async (req, res) => {
  const { fullName, email, organizationName, role, message } = req.body;

  // Enhanced validation
  validateRequired({ fullName, email, organizationName, role });
  validateEmail(email);
  
  // Sanitize and validate field lengths
  const sanitizedData = {
    fullName: fullName?.trim(),
    email: email?.toLowerCase().trim(),
    organizationName: organizationName?.trim(),
    role: role?.trim(),
    message: message?.trim() || ''
  };
  
  if (sanitizedData.fullName.length > 100) {
    throw new ValidationError('Full name must be less than 100 characters');
  }
  
  if (sanitizedData.organizationName.length > 100) {
    throw new ValidationError('Organization name must be less than 100 characters');
  }
  
  if (sanitizedData.role.length > 100) {
    throw new ValidationError('Role must be less than 100 characters');
  }
  
  if (sanitizedData.message.length > 2000) {
    throw new ValidationError('Message must be less than 2000 characters');
  }

  const timestamp = new Date().toISOString();
  const demoData = {
    ...sanitizedData,
    timestamp
  };

  // Enhanced logging for production
  console.log(`📝 Demo request received: ${demoData.organizationName} (${demoData.email})`);

  let emailSent = false;
  let emailError = null;

  try {
    // Check email service availability
    const isEmailServiceAvailable = await verifyEmailService();
    
    if (isEmailServiceAvailable) {
      const transporter = createEmailTransporter();
      const emailTemplate = generateDemoEmailTemplate(demoData);
      
      // Send email with enhanced configuration
      const emailResult = await transporter.sendMail({
        from: `"Aeronomy Platform" <${process.env.EMAIL_USER}>`,
        to: process.env.DEMO_EMAIL,
        cc: process.env.DEMO_EMAIL_CC ? process.env.DEMO_EMAIL_CC.split(',') : undefined,
        bcc: process.env.DEMO_EMAIL_BCC ? process.env.DEMO_EMAIL_BCC.split(',') : undefined,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
        replyTo: demoData.email,
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high'
        }
      });
      
      emailSent = true;
      console.log(`✅ Demo request email sent successfully: ${demoData.email} (${demoData.organizationName})`);
      console.log(`📧 Email ID: ${emailResult.messageId}`);
    } else {
      console.warn(`⚠️  Email service unavailable - request logged: ${demoData.email} (${demoData.organizationName})`);
    }

  } catch (error) {
    emailError = error;
    logError(error);
    console.error(`❌ Demo request email failed: ${error.message}`);
    console.error(`📝 Request details: ${demoData.email} (${demoData.organizationName})`);
  }

  // Always respond with success (graceful degradation)
  const response = {
    success: true,
    message: emailSent 
      ? 'Demo request submitted successfully! We will contact you within 24 hours.' 
      : 'Demo request received! We will contact you soon.',
    data: {
      submittedAt: timestamp,
      status: emailSent ? 'email_sent' : 'logged',
      contactInfo: {
        email: demoData.email,
        organization: demoData.organizationName,
        fullName: demoData.fullName
      },
      ...(process.env.NODE_ENV === 'development' && { 
        debug: {
          emailService: emailSent ? 'working' : 'failed',
          error: emailError?.message
        }
      })
    }
  };

  res.status(200).json(response);
});

// Enhanced health check with detailed email service status
export const healthCheck = asyncHandler(async (req, res) => {
  const startTime = Date.now();
  const isEmailServiceAvailable = await verifyEmailService();
  const responseTime = Date.now() - startTime;
  
  const healthData = {
    success: true,
    data: {
      status: 'Demo service running',
      emailService: {
        status: isEmailServiceAvailable ? 'Available' : 'Unavailable',
        configured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.SMTP_HOST),
        responseTime: `${responseTime}ms`
      },
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      version: '1.1.0',
      features: {
        emailNotifications: isEmailServiceAvailable,
        requestValidation: true,
        errorHandling: true,
        logging: true
      }
    }
  };

  res.json(healthData);
}); 