const { getWorker } = require('../api');

const getInvalidDetails = async (req, res) => {
    const response = await getWorker(218820099);
    console.log(response);
    res.render('pages/workers', {
        rc: response,
        id: 218820099,
        lat: '-',
        long: '-',
    });
};

module.exports = { getInvalidDetails };