const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db/")

// signup route
const zod = require("zod");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
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

    // Creating a new account with some existing money
    await Account.Create({
        userId,
        balance: 1+Math.random()*10000
    });

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

// Update info route

const updateSchema = zod.object({
    username: zod.optional(),
    firstName: zod.optional(),
    lastName: zod.optional()
});
// optional() allows the parameter to wither be there or not. 

router.put('/', authMiddleware,async (req, res) => {
    // need to validate the inputs first using zod
    const body = req.body;
    const { success } = updateSchema.safeParse(req.body);
    if (!success){
        res.status(411).json({
            message: 'Error while updating information'
        })
    }
    await User.updateOne({
        _id:userId,

    }, body)
    res.json({
        message: "Updated successfully"
    })
});

// Route to get usernames form the BE, filterable by firstName/lastName

router.get('/bulk', async (req, res) => {
    const filter = req.params.filter || "";
    // first I will try and fetch everything
    const users = await User.find({
        $or: [{firstName: {'$regex': filter}}, {lastName: {'$regex': filter}}]
    });

    res.status(200).json({
        user:users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})