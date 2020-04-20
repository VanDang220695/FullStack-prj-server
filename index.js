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

mongoose.connect(
  `mongodb+srv://admin:Kwm74JEl2yfE8E6W@cluster0-ok5pa.mongodb.net/email-management-dev?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      throw new Error('Connect MongoDB failed', error);
    } else {
      app.listen(PORT, () => {
        console.log('Connect mongo DB successful');
      });
    }
  },
);
