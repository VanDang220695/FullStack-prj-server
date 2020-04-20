const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${keys.mongoUsername}:${keys.mongoPassword}@cluster0-ok5pa.mongodb.net/${keys.mongoDbName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('Connect DB successful');
  })
  .catch((error) => console.log(error));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on Port ${PORT}`);
});
