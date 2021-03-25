
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema forobject.
 */
let articleSchema = new Schema({
    //article title is required.
    title:{
        type:String,required: "title is required"
    },
    //article content, can be empty
    description: {
        type: String
    },
    //screenshots or other related pics of this game
    picture:{
        type:String
    },
    //author of this article
    author:{type:String },
    CreateDate:{
        type:String ,
        // default:Date.now().toString()
    }
}, {
    versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
articleSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
articleSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('articles', articleSchema);
