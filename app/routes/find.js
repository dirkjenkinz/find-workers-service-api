const express = require('express');
const router = express.Router();
const { getFind, postFind } = require('../handlers/find-handler');
router.get('/', getFind);
router.post('/', postFind);
module.exports = router;
