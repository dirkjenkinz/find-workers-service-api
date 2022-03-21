const axios = require('axios');

const findWorkersByLocation = async (location) => {
    let response = await axios.get(`http://localhost:8080/v1/workers/${location}`);
    return response;
}

module.exports = { 
    findWorkersByLocation
};