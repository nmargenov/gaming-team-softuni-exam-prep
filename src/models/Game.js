const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required!'],
        minLength:[4,'Name must be atleast 4 characters long!']
    },
    price:{
        type:Number,
        required:[true,'Price is required!']
    },
    imageUrl:{
        type:String,
        required:[true,'Image URL is required!']
    },
    genre:{
        type:String,
        required:[true,'Genre is required!'],
        minLength:[2,"Genre must be atleast 2 characters long!"]
    },
    description:{
        type:String,
        required:[true,'Description is required!'],
        minLength:[10,"Description must be atleast 10 characters long!"]
    },
    platform:{
        type:String,
        required:[true,"Platform is required!"],
        enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    bougthBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
});

const Game = mongoose.model('Game',gameSchema);

module.exports = Game;