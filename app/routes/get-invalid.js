const express = require('express');
const router = express.Router();

const { getInvalidDetails } = require('../handlers/invalid-handler');

router.get('/', getInvalidDetails);
module.exports = router;
