const express = require("express");
const router = express.Router();

const userRouter = require("../routes/user");

const accountRouter = require("../routes/accounts");
router.use('/accounts', accountRouter);
router.use('/user', userRouter);


module.exports = router;

// all the requests should look something like this /api/v1/user ...
    
