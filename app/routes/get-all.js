const express = require('express');
const router = express.Router();

const { getAllDetails } = require('../handlers/get-all-handler');

router.get('/', getAllDetails);
module.exports = router;
