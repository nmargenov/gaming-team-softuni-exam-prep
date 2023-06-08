const bcrypt = require('bcrypt');
const { sign } = require('../lib/jwt');
const { SECRET } = require('../config/config');

const User = require("../models/User");

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
    
    const newUser = await User.create(user);

    const payload = {
        username:newUser.username,
        email:newUser.email,
        _id:newUser._id
    }

    const token = await sign(payload,SECRET,{expiresIn:'2d'});

    return token;
}

async function login(email,password){
    const user = await findEmail(email);

    if(!user){
        throw new Error('Email or password don\'t match!');
    }

    const isValidPassword = await bcrypt.compare(password,user.password);

    if(!isValidPassword){
        throw new Error('Email or password don\'t match!');
    }

    const payload = {
        username:user.username,
        email:user.email,
        _id:user._id
    }

    const token = await sign(payload,SECRET,{expiresIn:'2d'});

    return token;
}

function findUsername(username){
    return User.findOne({username});
}

function findEmail(email){
    return User.findOne({email});
}

module.exports = {register,login}