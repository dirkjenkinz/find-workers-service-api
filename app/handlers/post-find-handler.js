const { logger } = require('../utils');
const { findWorkersByLocation } = require('../api');
const url = require('url');

const postFind = async (req, res) => {
    logger.info('post find handler');
    const u = url.parse(req.originalUrl, true);
    console.log(u.query);
    let response = await findWorkersByLocation({latitude: u.query.latitude, longitude: u.query.longitude});
    if (response.length === 0) response = '';
    console.log(response)
    res.render('pages/find', {
        data: response,
    });
};

module.exports = { postFind };