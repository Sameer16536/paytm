const dotenv = require('dotenv')

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

//Model
const User = mongoose.model('User',userSchema)

//Export the Model:
module.exports={
    User
}