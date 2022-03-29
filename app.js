const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
let app = express();
const bodyParser = require('body-parser');
const findRouter = require('./app/routes/find');

const {logger} = require('./app/utils')
const { getTimeStamp } = require('./app/utils');
const router = express.Router;

nunjucks.configure(['views',
    path.join(__dirname, 'node_modules/govuk-frontend/'),
    path.join(__dirname, 'node_modules/govuk-frontend/govuk/components/'),
    path.join(__dirname, 'app/views/')
], {
    autoescape: true,
    express: app
});

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/css', express.static(path.resolve(__dirname, 'app/public/css')));
app.use('/', findRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    const t = getTimeStamp();
    logger.info(`Workers Store API up and running on port ${PORT} at ${t[0]} - ${t[1]}`);
});

module.exports = { app, router };
