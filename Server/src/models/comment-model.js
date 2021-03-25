'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema forobject.
 */
let commentSchema = new Schema({
    /**
     * Title of the game
     */
    content: {type: String,required: "content is required"},
    author:{type:String },                     //作者
    article:{type:String},

}, {
    versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
commentSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
commentSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('comments', commentSchema);
