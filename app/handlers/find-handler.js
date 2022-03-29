const { logger } = require('../utils');
const { findWorkersByLocation } = require('../api');

const getFind = async (req, res) => {
    logger.info('get find handler');
    res.render('pages/find', {
        data: '',
        msg: ''
    });
};

const postFind = async (req, res) => {
    logger.info('post find handler');
    let response = await findWorkersByLocation(req.body);
    let msg = '';
    if (response.length === 0) {
        response = ''
        msg = 'No matching records found'
    };
    res.render('pages/find', {
        data: response,
        message: msg,
    });
};

module.exports = {
    getFind,
    postFind
};