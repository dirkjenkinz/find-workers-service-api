const { getAllWorkers } = require('../api');

const getAllDetails = async (req, res) => {
    const response = await getAllWorkers();
    res.render('pages/all', {
        rc: response.status,
        list: response.data,
    });
};

module.exports = { getAllDetails };