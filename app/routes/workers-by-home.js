const express = require('express');
const router = express.Router();

const { workersByHome } = require('../handlers/workers-by-home-handler');

router.get('/', workersByHome);
module.exports = router;
