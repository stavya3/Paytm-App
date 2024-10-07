const express = require("express");
const router = express.Router();

const userRouter = require("../routes/user");
router.use('/user', userRouter);
const accountRouter = require("../routes/accounts");
router.use('/accounts', accountRouter);

module.exports = router;

// all the requests should look something like this /api/v1/user ...
    
