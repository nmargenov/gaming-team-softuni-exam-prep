const router = require('express').Router();

const homeController = require('./controllers/homeController');

router.use(homeController);

router.get('*',(req,res)=>{
    res.status(404).render('404');
})

module.exports = router;    