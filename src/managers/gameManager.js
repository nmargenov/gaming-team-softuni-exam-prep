const Game = require("../models/Game");

const platforms = ["PC","Nintendo","PS4","PS5","XBOX"];
const pattern = /^https?:\/\//;

function getAllGames(){
    return Game.find();
}

function createGame(platform,name,imageUrl,price,genre,description,owner){
    if(!platforms.includes(platform)){
        throw new Error("Invalid platform!");
    }

    if(!pattern.test(imageUrl)){
        throw new Error('Invalid image URL!');
    }
    
    if(price<0){
        throw new Error('Price must be a positive number!');
    }

    const game = {
        platform,
        name,
        imageUrl,
        price,
        genre,
        description,
        owner
    }

    return Game.create(game);

}
function editGameById(gameId,platform,name,imageUrl,price,genre,description){
    if(!platforms.includes(platform)){
        throw new Error("Invalid platform!");
    }

    if(!pattern.test(imageUrl)){
        throw new Error('Invalid image URL!');
    }
    
    if(price<0){
        throw new Error('Price must be a positive number!');
    }

    const game = {
        platform,
        name,
        imageUrl,
        price,
        genre,
        description
    }

    return Game.findByIdAndUpdate(gameId,game,{runValidators:true});

}

function deleteGameById(gameId){
    return Game.findByIdAndDelete(gameId);
}

function buyGame(gameId,buyerId){
    return Game.findByIdAndUpdate(gameId,{$push:{bougthBy:buyerId}});
}


function getGameById(gameId){
    return Game.findById(gameId);
}

module.exports = {createGame,getAllGames,getGameById,editGameById,deleteGameById,buyGame}