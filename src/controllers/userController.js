const { register, login } = require('../managers/userManager');
const { mustBeGuest, mustBeAuth } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/login',mustBeGuest,(req,res)=>{
    res.status(302).render('users/login');
});

router.post('/login',mustBeGuest,async(req,res)=>{
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    try{
        const token = await login(email,password);
        res.cookie('auth',token);
        res.redirect('/');
    }catch(err){
        const error = err.message;
        res.render('users/login',{error,email});
    }

});

router.get('/register',mustBeGuest,(req,res)=>{
    res.status(302).render('users/register');
});

router.post('/register',mustBeGuest,async (req,res)=>{
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const rePassword = req.body.rePassword.trim();

    try{
        const token = await register(username,email,password,rePassword);
        res.cookie('auth',token);
        res.redirect('/');
    }catch(err){
        const error = err.message;
        res.render('users/register',{error,username,email});
    }

});

router.get('/logout',mustBeAuth,(req,res)=>{
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;