const { register, login } = require('../managers/userManager');

const router = require('express').Router();

router.get('/login',(req,res)=>{
    res.status(302).render('users/login');
});

router.post('/login',async(req,res)=>{
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    try{
        const user = await login(email,password);
        res.redirect('/');
    }catch(err){
        const error = err.message;
        res.render('users/login',{error,email});
    }

});

router.get('/register',(req,res)=>{
    res.status(302).render('users/register');
});

router.post('/register',async (req,res)=>{
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const rePassword = req.body.rePassword.trim();

    try{
        await register(username,email,password,rePassword);
        res.redirect('/');
    }catch(err){
        const error = err.message;
        res.render('users/register',{error,username,email});
    }

});

module.exports = router;