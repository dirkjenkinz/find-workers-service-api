const express = require('express');
const router = express.Router();

const { getWorkerDetails } = require('../handlers/workers-handler');

router.get('/', getWorkerDetails);
module.exports = router;
