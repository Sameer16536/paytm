// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance',authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession()
    session.startTransaction()
    const account = await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance
    })
})

router.post('/transfer',authMiddleware,async(req,res)=>{
    const {amount,to}= req.body

    //Fetch the account
    const account = await Account.findOne({userId:req.userId}).session(session)

    if(!account || account.balance < amount){
        await session.abortTransaction()
        return res.status(400).json({
            messsage:"Insufficient Balance"
        });

    }

    const toAccount = await Account.findOne({userId:to}).session(session)
    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            msg:"Invalid Account"
        })
    }

    //transfer
    await Account.updateOne({ userId:req.userId},{$inc:{ balance:-amount}}).session(session)
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)

    //Do the transaction:
    await session.commitTransaction()
    res.json({
        msg:"Transfer successful"
    })
})
// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })

// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })

module.exports = router;