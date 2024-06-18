const express = require('express')
const router = express.Router()
const zod = require('zod')
const {User}  = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')


const userInputSchema = zod.object({
    username: zod.string().min(3).max(30).email(),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
})

router.post('/signup', async (req, res) => {
    
    
    const result  = userInputSchema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({ error: 'Invalid input / username is already taken' })
    }
    //Check for the exisiting user
    const existingUser = await User.findOne({ username: req.body.username })
    if(existingUser){
        res.json({msg:"User already exists"}).status(411)
    }
    //Create new user`
    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    //Get user ID
    const userId = user._id


    //Generate token:
    const token = jwt.sign({userId},JWT_SECRET)
    //Success Msg
    res.json({msg:"Tuser created successfully",token:token})

})
module.exports = router;