const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDbName = process.env.MONGO_DB_NAME;

const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0-u9v7s.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`;

module.exports = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  googleAccount: process.env.GOOGLE_ACCOUNT_SEND_EMAIL,
  googlePassword: process.env.GOOGLE_PASSWORD_SEND_EMAIL,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};
