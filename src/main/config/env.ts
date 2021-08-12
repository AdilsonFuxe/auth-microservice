export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/authDb',
  port: process.env.PORT || 5050,
  jwtSecret:
    process.env.JWT_SECRET ||
    'e9cfc88d48b675ebdb4bdbf7384e5641d78d79f7192bb9823a1fece99b4078ab',
};
