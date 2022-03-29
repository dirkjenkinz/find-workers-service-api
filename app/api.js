const axios = require('axios');
const { logger } = require('../../worker-store-api/app/utils');

const findWorkersByLocation = async (location) => {
    logger.info('findWorkersByLocation');
    console.log('location=', location);
    const response = await axios.get(`http://localhost:8080/v1/workers/${location.latitude}, ${location.longitude}`);
    logger.info('response=', response.data);
    return response.data;
}

module.exports = { 
    findWorkersByLocation
};