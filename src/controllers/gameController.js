const router = require('express').Router();

router.get('/create',(req,res)=>{
    res.status(302).render('games/create');
});

router.post('/create',(req,res)=>{
    const platform = req.body.platform;
    const name = req.body.name.trim();
    const imageUrl = req.body.imageUrl.trim();
    const price = req.body.price.trim();
    const genre = req.body.genre.trim();
    const description = req.body.description.trim();

    console.log(platform,name,imageUrl,price,genre,description);
    res.end();
});

module.exports = router;