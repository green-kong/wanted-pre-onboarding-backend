const express = require('express');
const controller = require('../../controller/company.controller.js');

const router = express.Router();

router.get('/recruitment', controller.createRecruitment);

router.patch('/updatePosting', controller.updateRecruitment);

module.exports = router;
