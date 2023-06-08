const router = require('express').Router();

router.get(['/','/index'],(req,res)=>{
    res.render('home');
});

module.exports = router;