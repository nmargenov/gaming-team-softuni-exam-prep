const { createGame, getAllGames } = require('../managers/gameManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/create',mustBeAuth,(req,res)=>{
    res.status(302).render('games/create');
});

router.post('/create',mustBeAuth,async(req,res)=>{
    const platform = req.body.platform;
    const name = req.body.name.trim();
    const imageUrl = req.body.imageUrl.trim();
    const price = req.body.price.trim();
    const genre = req.body.genre.trim();
    const description = req.body.description.trim();
    
    const owner = req.user._id;

    try{
        await createGame(platform,name,imageUrl,price,genre,description,owner);

        res.redirect('/games/all');
    }catch(err){
        const error = err.message;
        console.log(error);
        res.render('games/create',{error,name,imageUrl,price,genre,description});
    }
});

router.get('/all',async (req,res)=>{
    const games = await getAllGames().lean();

    const hasGames = games.length>0;

    res.status(302).render('games/catalog',{hasGames,games});
});

module.exports = router;