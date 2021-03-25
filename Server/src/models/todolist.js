'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema forobject.
 */
let todoSchema = new Schema({
    /**
     * Title of the todoitem
     */
    title: {
        type: String,
        required: "title is required"
    },
    
    description: {
        type: String
    },
    createdate: {
        type:Date,
        default:Date.now
    },
    modifiedDate :{
        type:Date,
        default:Date.now
    },
    status:{
        type: String
    },
    duedate:{
        type:String
    }
   
}, {
    versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
todoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
todoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('todos', todoSchema);