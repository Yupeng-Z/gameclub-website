'use strict';
const mongoose = require('mongoose');
const comments = mongoose.model('comments');
const userService = require('../services/user-services');
const AdmZip = require('adm-zip');
const fs = require('fs');
/**
 *
 *
 * @param {*} params
 * @returns
 */
/**
 *
 *
 * @param {*} params
 * @returns
 */
exports.search = function (params) {
    const promise = comments.find(params).exec();
    return promise;
};
/**
 *
 *
 * @param {*} params
 * @returns
 */
exports.get = function (params) {
    const promise = comments.findById(params).exec();
    return promise
};

/**
 *
 *
 * @param {*} add
 * @returns
 */
exports.create = function (add) {
    const newComment =new comments(add)
    const promise = newComment.save(newComment);
    return promise;
};

/**
 *
 *
 * @param {*} gameID
 * @param {*} update_content
 * @returns
 */
exports.update =function(commentID, update_content){
    const promise = comments.findByIdAndUpdate(commentID, update_content).exec();
    return promise;
}

/**
 *
 *
 * @param {*} game
 * @param {*} authorId
 * @returns
 */
exports.newComment= (comment, authorId) => {
    const promise = comments.create(comment)
        .then((newComment) => {
            userService.AddComment(newComment, authorId)
        })
    return promise;
}
exports.delete = function (cid) {
    const promise = comments.remove({_id: cid});
    return promise;
};
