const { logger } = require('../utils');

const getFind = async (req, res) => {
    logger.info('get find handler');
    res.render('pages/find', {
        data: '',
    });
};

module.exports = { getFind };