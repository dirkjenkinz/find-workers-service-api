const express = require('express');
const router = express.Router();

const { postFind } = require('../handlers/post-find-handler');

router.get('/', postFind);
module.exports = router;
