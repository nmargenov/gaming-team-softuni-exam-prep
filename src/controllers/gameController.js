const { createGame, getAllGames, getGameById, editGameById, deleteGameById } = require('../managers/gameManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');
const { optionsGenerator } = require('../utils/utils');

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
        res.render('games/create',{error,name,imageUrl,price,genre,description});
    }
});

router.get('/all',async (req,res)=>{
    const games = await getAllGames().lean();

    const hasGames = games.length>0;

    res.status(302).render('games/catalog',{hasGames,games});
});

router.get('/:gameId/details',async(req,res)=>{
    const gameId = req.params.gameId;
    const loggedUser = req.user?._id;
    
    
    try{
        const game = await getGameById(gameId).lean();
        if(!game){
            throw new Error();
        }

        const isLogged = loggedUser!= undefined;
        const isOwner = loggedUser == game.owner;

        
        res.status(302).render('games/details',{game,isOwner,isLogged});
    }catch(err){
        res.status(404).render('404');
    }
});

router.get('/:gameId/edit',mustBeAuth,async(req,res)=>{
    const gameId = req.params.gameId;
    const loggedUser = req.user._id;

    try{
        const game = await getGameById(gameId).lean();
        if(!game){
            throw new Error();
        }
        if(game.owner !=loggedUser){
            throw new Error();
        }

        const options = optionsGenerator(game.platform);

        res.status(302).render('games/edit',{game,options});

    }catch(err){
        res.status(404).render('404');
    }
});

router.post('/:gameId/edit',mustBeAuth,async(req,res)=>{
    const platform = req.body.platform;
    const name = req.body.name.trim();
    const imageUrl = req.body.imageUrl.trim();
    const price = req.body.price.trim();
    const genre = req.body.genre.trim();
    const description = req.body.description.trim();

    const game = {
        name,imageUrl,price,genre,description
    }
    
    const loggedUser = req.user._id;
    const gameId = req.params.gameId;
    try{
        const game = await getGameById(gameId);
        if(!game){
            throw new Error('Invalid game ID!');
        }
        if(game.owner !=loggedUser){
            throw new Error('Invalid owner!');
        }

        await editGameById(gameId,platform,name,imageUrl,price,genre,description);

        res.redirect(`/games/${game._id}/details`);
    }catch(err){
        const error = err.message;
        const options = optionsGenerator(platform);
        res.render(`games/edit`,{error,game,options});
    }
});

router.get('/:gameId/delete',mustBeAuth,async(req,res)=>{
    const gameId = req.params.gameId;
    const loggedUser = req.user._id;

    try{
        const game = await getGameById(gameId);
        if(!game){
            throw new Error('Invalid game ID!');
        }
        if(game.owner !=loggedUser){
            throw new Error('Invalid owner!');
        }

        await deleteGameById(gameId);

        res.redirect('/');
    }catch(err){
        res.status(404).render('404');
    }
});


module.exports = router;