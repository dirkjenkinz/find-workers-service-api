const axios = require('axios');
const { logger } = require('../../worker-store-api/app/utils');

const findWorkersByLocation = async (location) => {
    logger.info('findWorkersByLocation');
    try {
        const response = await axios.get(`http://localhost:8080/v1/workers/${location.latitude}, ${location.longitude}`);
        return response.data;
    } catch (error) {
        logger.error(error);
        return [];
    }
};

module.exports = { 
    findWorkersByLocation
};
