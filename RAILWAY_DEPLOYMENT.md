# Railway Production Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Email Service Configuration
Your Railway environment must have these variables set:

#### Required Variables:
- `EMAIL_USER` - Your SMTP username (e.g., your email address)
- `EMAIL_PASS` - Your SMTP password or app-specific password
- `SMTP_HOST` - Your SMTP server host
- `SMTP_PORT` - Your SMTP port (587 for TLS, 465 for SSL)
- `SMTP_SECURE` - Set to "true" for SSL (port 465) or "false" for TLS (port 587)
- `DEMO_EMAIL` - Email address where demo requests will be sent

#### Optional Variables:
- `DEMO_EMAIL_CC` - CC recipients (comma-separated)
- `DEMO_EMAIL_BCC` - BCC recipients (comma-separated)
- `SMTP_REJECT_UNAUTHORIZED` - Set to "false" if having SSL issues

### 2. Email Provider Examples

#### Gmail Configuration:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
DEMO_EMAIL=your-business-email@gmail.com
```

#### Outlook/Hotmail Configuration:
```
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
DEMO_EMAIL=your-business-email@outlook.com
```

#### Yahoo Configuration:
```
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
DEMO_EMAIL=your-business-email@yahoo.com
```

#### Custom SMTP (Professional):
```
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=your-smtp-password
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
DEMO_EMAIL=demos@yourdomain.com
```

## 🔧 Railway Deployment Steps

### 1. Configure Environment Variables
In your Railway dashboard:
1. Go to your project settings
2. Navigate to "Variables" tab
3. Add all the email configuration variables above
4. Make sure `NODE_ENV` is set to `production`

### 2. Deploy to Railway
```bash
# Commit your changes
git add .
git commit -m "Production-ready backend with email notifications"

# Push to Railway (assuming you have Railway CLI configured)
railway up

# Or push to your connected Git repository
git push origin main
```

### 3. Verify Deployment
After deployment, check these endpoints:

#### Health Check:
```
GET https://your-app.up.railway.app/api/health
```

Should return:
```json
{
  "success": true,
  "data": {
    "status": "Server running",
    "environment": "production",
    "services": {
      "email": "configured"
    }
  }
}
```

#### Demo Service Health:
```
GET https://your-app.up.railway.app/api/demo/health
```

Should return:
```json
{
  "success": true,
  "data": {
    "status": "Demo service running",
    "emailService": {
      "status": "Available",
      "configured": true
    }
  }
}
```

### 4. Test Email Functionality
Submit a demo request through your frontend and verify:
1. ✅ Request is processed successfully
2. ✅ Email is sent to your configured `DEMO_EMAIL`
3. ✅ Email contains all form data with professional formatting
4. ✅ Reply-to is set to the customer's email

## 🎯 Production Features

### Email Notifications
- ✅ Professional HTML email templates
- ✅ Automatic reply-to customer email
- ✅ High priority email headers
- ✅ Fallback text version
- ✅ Comprehensive form data inclusion
- ✅ Timestamp and environment info

### Security Features
- ✅ Rate limiting (100 requests per minute per IP)
- ✅ Enhanced security headers
- ✅ CORS configuration for production domains
- ✅ Input validation and sanitization
- ✅ Graceful error handling

### Performance Optimizations
- ✅ Enhanced compression
- ✅ Static file caching
- ✅ Production-appropriate logging
- ✅ Memory usage monitoring
- ✅ Graceful shutdown handling

## 🛠️ Troubleshooting

### Email Not Sending
1. Check Railway logs for email errors
2. Verify all email environment variables are set
3. Test email credentials outside Railway
4. Check spam folders
5. Verify SMTP settings with your email provider

### Common Email Issues

#### Gmail App Passwords:
- Enable 2FA on your Google account
- Generate an app-specific password
- Use the app password as `EMAIL_PASS`

#### Outlook Authentication:
- Modern authentication might require OAuth2
- For basic auth, ensure "Less secure app access" is enabled

#### Custom SMTP Issues:
- Verify SSL/TLS settings
- Check firewall rules
- Confirm port accessibility

### Debug Mode
Set `NODE_ENV=development` temporarily to see detailed error messages.

## 📧 Email Template Preview

Demo request emails include:
- 🚨 URGENT priority marking
- 👤 Customer contact information
- 🏢 Organization details
- 💼 Role/position information
- 💬 Custom message/requirements
- ⏰ Formatted timestamp
- 📧 Direct reply button
- ⚡ 24-hour response reminder

## 🔍 Monitoring

### Health Checks
Railway automatically monitors `/api/health` endpoint every 30 seconds.

### Logs
Monitor Railway logs for:
- ✅ `Demo request email sent successfully`
- ⚠️ `Email service verification failed`
- ❌ `Demo request email failed`

### Performance Metrics
- Server uptime
- Memory usage
- Request response times
- Email delivery success rate

## 🚨 Important Notes

1. **Environment Variables**: Double-check all email variables are set correctly
2. **Email Limits**: Be aware of your email provider's sending limits
3. **Security**: Never commit email passwords to version control
4. **Testing**: Always test email functionality after deployment
5. **Monitoring**: Set up alerts for failed email deliveries

## 📞 Support

If you encounter issues:
1. Check Railway deployment logs
2. Verify email provider settings
3. Test with a simple email client first
4. Check this guide for common solutions

---

**Ready to deploy!** 🚀 Your backend is now production-ready with robust email notifications for demo requests. 