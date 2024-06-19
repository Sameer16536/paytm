const dotenv = require('dotenv')
// const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
dotenv.config()

//Connect to db:::
mongoose.connect(process.env.MONGODB_URL)

//Schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})


//Bank Scehma :
const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        //ref to user schema
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})


//hashing :
//generate hash from a plainText 
// userSchema.methods.createHash = 


//Model
const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account', accountSchema);



//Export the Model:
module.exports={
    User,
    Account
}