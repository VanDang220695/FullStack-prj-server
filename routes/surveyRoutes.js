const mongoose = require('mongoose');

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/:id/:choice', requireLogin, (req, res) => {
    const { choice, id } = req.params;
    Survey.updateOne(
      { _id: id, responded: false },
      {
        $inc: { [choice]: 1 },
        $set: { responded: true, lastResponded: new Date() },
      },
    ).exec();
    res.json({ message: 'Thanks for voting' });
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      email: false,
    });
    res.json(surveys);
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, email } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      email: email.trim(),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send email
    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.json(user);
    } catch (error) {
      res.status(422).json(error);
    }
  });
};
