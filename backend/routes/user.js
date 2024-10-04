const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const { User } = require("../db/")

// signup route
const zod = require("zod");
const { User } = require("../db");
const signupBody = {
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
};

router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupBody.safeParse(req.body);
    if (!success){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = User.findOne({
        username: body.username
    });

    if (user._id){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const dbUser = await User.create(body); // this is equivalent to User.create({username:req.body.username, password:req.body.password,...})
    const userId = user._id;
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);
    res.json({
        massage: "User created successfully!",
        token: token
    })
   
});

// signin route

const signinSchema = zod.object({
    username:zod.string().email(),
    password:zod.string()
});
router.post('/signin', async (req, res) => {
    // again input validation
    const body = req.body;
    const { success } = signinSchema.safeParse(req.body);
    if (!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    });
    
    if (user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
});

