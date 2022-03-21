const { findWorkersByHome } = require('../api');

const workersByHome = async (req, res) => {
    const response = await findWorkersByHome('home');
    res.render('pages/workers-by-home', {
        list: response.data,
    });
};

module.exports = { workersByHome };