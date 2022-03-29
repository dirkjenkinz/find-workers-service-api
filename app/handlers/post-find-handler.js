const { logger } = require('../utils');
const { findWorkersByLocation } = require('../api');

const postFind = async (req, res) => {
    logger.info('post find handler');
    let response = await findWorkersByLocation(req.body);
    if (response.length === 0) response = '';
    res.render('pages/find', {
        data: response,
    });
};

module.exports = { postFind };