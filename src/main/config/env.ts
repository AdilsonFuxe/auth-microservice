export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/authDb',
  port: process.env.PORT || 5050,
  jwtSecret:
    process.env.JWT_SECRET ||
    'e9cfc88d48b675ebdb4bdbf7384e5641d78d79f7192bb9823a1fece99b4078ab',
  smtpMail: process.env.SMTP_MAIL || 'server.mail@mail.com',
  smtpHost: process.env.SMTP_HOST || 'localhost',
  smtpPort: process.env.SMTP_PORT || 12345,
  smtpUser: process.env.SMTP_USER || 'admin',
  smtpPass: process.env.SMTP_PASS || 'admin',
};
