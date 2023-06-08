const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Username is required!"],
        minLength:[5,'Username must be atleast 5 characters long!']
    },
    email:{
        type:String,
        required:[true,'Email is required!'],
        minLength:[10,'Email must be atleast 10 characters long!']
    },
    password:{
        type:String,
        required:[true,'Password is required!'],
        minLength:[4,'Passowrd must be atleast 4 characters long!']
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;