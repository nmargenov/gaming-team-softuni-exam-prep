const router = require('express').Router();

router.get(['/','/index'],(req,res)=>{
    res.render('home');
});

router.get('/search',(req,res)=>{
    res.render('search');
})

module.exports = router;