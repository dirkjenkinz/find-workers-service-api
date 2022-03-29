const express = require('express');
const router = express.Router();

const { getFind } = require('../handlers/get-find-handler');

router.get('/', getFind);
module.exports = router;
