const express = require('express');
const controller = require('../../controller/company.controller.js');

const router = express.Router();

router.get('/recruitment', controller.recruitmentList);

router.post('/recruitment', controller.createRecruitment);

router.patch('/recruitment', controller.updateRecruitment);

router.delete('/recruitment', controller.deleteRecruitment);

module.exports = router;
