const { getAllGames } = require('../managers/gameManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');
const { optionsGenerator } = require('../utils/utils');

const router = require('express').Router();

router.get(['/','/index'],(req,res)=>{
    res.status(302).render('home');
});

router.get('/search',mustBeAuth,async (req,res)=>{
    try{
        let games = await getAllGames().lean();
        const hasGames = games.length>0;
        
        const search = req.query.search;
        const platform = req.query.platform;
        
        if(search){
            games = games.filter(game=>game.name.toLowerCase().includes(search.trim()));
        }

        if(platform){
            games = games.filter(game=>game.platform==platform);
        }

        const options = optionsGenerator(platform,true);

        res.status(302).render('search',{games,hasGames,search,options});
    }catch(err){
        console.log(err);
        res.status(404).render('404');
    }
})

module.exports = router;