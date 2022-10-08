const express = require('express');
const router = express.Router();

const companyRouter = require('./company/companyRouter.js');
const userRouter = require('./user/userRouter.js');

router.use('/company', companyRouter);
router.use('/user', userRouter);

module.exports = router;
