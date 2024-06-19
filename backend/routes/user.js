const express = require('express')
const router = express.Router()
const zod = require('zod')
const { User ,Account} = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const { authMiddlware } = require('../middleware')

//During SignIn
const userInputSchema = zod.object({
    username: zod.string().min(3).max(30).email(),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
})

//During SignUp 
const signUpSchema = zod.object({
    username: zod.string().min(3).max(30).email(),
    password: zod.string().min(6)
})

//for Updation
const updateSchema = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().max(50).optional(),
    lastName: zod.string().max(50).optional(),
})

router.post('/signup', async (req, res) => {


    const result = userInputSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({ error: 'Invalid input / username is already taken' })
    }
    //Check for the exisiting user
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
        res.json({ msg: "User already exists" }).status(411)
    }
    //Create new user`
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    //Get user ID
    const userId = user._id


    //Create account:
    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })

    //Generate token:
    const token = jwt.sign({ userId }, JWT_SECRET)
    
    //Success Msg
    res.json({ msg: "Tuser created successfully", token: token })

})

//Signin
router.post('/signin', async (req, res) => {
    const result = userInputSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({ error: 'Invalid input' })
    }
    //Find the user:
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })


    //Validate the token
    if (user) {
        {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET)
        }
    }
    res.status(411).json({
        message: "Error while logging in"
    })

})

//update User info
router.put('/user', authMiddlware, async (req, res) => {
    const { success } = authMiddlware.safeParse(req.body)
    if (!success) {
        res.status(411).json({ msg: "Error while Updating the info" })
    }
    await User.updateOne({ _id: req.userId }, req.body)
})
res.json({
    message: "Updated successfully"
})
module.exports = router;


//Route to get users from the backend, filterable via firstName/lastName
router.get('/bulk',async(req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName:{
                $regex:filter,
            },
            lastName:{
                $regex:filter,
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})