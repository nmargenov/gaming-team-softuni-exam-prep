const router = require('express').Router();

router.get(['/','/index'],(req,res)=>{
    res.status(302).render('home');
});

router.get('/search',(req,res)=>{
    res.status(302).render('search');
})

module.exports = router;