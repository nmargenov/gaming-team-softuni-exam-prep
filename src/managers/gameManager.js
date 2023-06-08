const Game = require("../models/Game");

const platforms = ["PC","Nintendo","PS4","PS5","XBOX"];
const pattern = /^https?:\/\//;

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

module.exports = {createGame}