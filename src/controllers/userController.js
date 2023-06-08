const { register } = require('../managers/userManager');

const router = require('express').Router();

router.get('/login',(req,res)=>{
    res.status(302).render('users/login');
});

router.get('/register',(req,res)=>{
    res.status(302).render('users/register');
});

router.post('/register',async (req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const rePassword = req.body.rePassword;

    try{
        await register(username,email,password,rePassword);
        res.redirect('/');
    }catch(err){
        const error = err.message;
        res.render('users/register',{error,username,email});
    }

});

module.exports = router;