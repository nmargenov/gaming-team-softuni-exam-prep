const bcrypt = require('bcrypt');

const User = require("../models/User");

function findUsername(username){
    return User.findOne({username});
}

function findEmail(email){
    return User.findOne({email});
}

async function register(username,email,password,rePassword){
    const existingUsername = await findUsername(username);
    const existingEmail = await findEmail(email);

    if(existingUsername){
        throw new Error('Username is already in use!');        
    }

    if(existingEmail){
        throw new Error('Email is already in use!');        
    }

    if(password.length<4){
        throw new Error('Password must be atleast 4 characters long!');
    }
    
    if(password != rePassword){
        throw new Error('Passwords must match!');
    }

    const hashPass = await bcrypt.hash(password,10);

    const user = {
        username,
        email,
        password:hashPass
    };

    return User.create(user);
}

module.exports = {register}