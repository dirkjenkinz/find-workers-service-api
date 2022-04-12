const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const helmet = require('helmet');
const csp = require('helmet-csp');
// eslint-disable-next-line camelcase
const { v4: uuid_v4 } = require('uuid');
const bodyParser = require('body-parser');
const findRouter = require('./app/routes/find');
const { logger } = require('./app/utils');
const { getTimeStamp } = require('./app/utils');

const router = express.Router;
const app = express();

/* Generate nonce. */
const nonce = Buffer.from(uuid_v4().toString('base64'));
app.use((req, res, next) => {
  res.locals.nonce = nonce;
  next();
});

nunjucks.configure(['views',
  path.join(__dirname, 'node_modules/govuk-frontend/'),
  path.join(__dirname, 'node_modules/govuk-frontend/govuk/components/'),
  path.join(__dirname, 'app/views/'),
], {
  autoescape: true,
  express: app,
});

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(helmet());

app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      `'nonce-${nonce}'`, // Pass the nonce value along.
      "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
    ],
    imgSrc: ["'self'"],
    fontSrc: ["'self'"],
  },
}));

// referrerPolicy
app.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }));

app.use('/css', express.static(path.resolve(__dirname, 'app/public/css')));
app.use('/', findRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  const t = getTimeStamp();
  logger.info(`Find workers service API up and running on port ${PORT} at ${t[0]} - ${t[1]}`);
});

module.exports = { app, router };
