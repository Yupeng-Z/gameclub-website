
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema forobject.
 */
let gameSchema = new Schema({
    /**
     * Title of the game
     */
    name: {type: String,required: "name is required"},
    description: {type: String},
    //rating:{type: },
    //id: {type:String },                      //game ID
    rating: {type:Number },                     //game rating
    author:{type:String },                     //作者
    like:{type:Array},                 //喜欢
    icon: {type:String }, 
    photo:{type:String }, 
    gameurl:{type:String }, 
    ratingDetail:{type:Array}
}, {
    versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
gameSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
gameSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('games', gameSchema);