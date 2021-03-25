'use strict'
const mongoose = require('mongoose'),
    todo = mongoose.model('todos');
exports.search = (params) => {
    const promise = todo.find(params).exec();
    return promise;
};

exports.create = (todoItem) =>{
    const promise = new todo(todoItem).save();
    return promise;
};

exports.update = (update) =>{
    update.modifiedDate = new Date();
    const promise = todo.findOneAndUpdate({_id: update._id}, update).exec();
    return promise;
};

exports.delete = function (todoId) {
    const promise = todo.remove({_id: todoId});
    return promise;
};

exports.get = function (todoId) {
    const promise = todo.findById(todoId).exec();
    return promise
};