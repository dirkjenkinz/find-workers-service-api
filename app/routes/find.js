const express = require('express');
const { getFind, postFind } = require('../handlers/find-handler');

const router = express.Router();
router.get('/', getFind);
router.post('/', postFind);
module.exports = router;
