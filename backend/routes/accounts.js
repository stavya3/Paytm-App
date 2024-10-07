const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();


router.get('/balance', authMiddleware, async (req, res) => {
     const account = await Account.findOne({
        userId: req.userId
     });

     res.json({
        balance: account.balance
     })
});

router.post('transfer', authMiddleware, async (req,res) => {

    
});

module.exports = router;