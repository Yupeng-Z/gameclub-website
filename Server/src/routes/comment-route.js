'use strict';
//let fs=require('fs')
let controller=require('../controller/comment-controller')
module.exports = function (app) {
    const jwtHelper = require('../config/jwtHelper'),
        userCtrl = require('../controller/user-controller');

    app.route('/comments')
        .get(controller.list)
        .post(controller.create)
    app.route('/comments/byauthor/:id')
        .get(controller.findbyauth);
    app.route('/comments/byarticle/:id')
        .get(controller.findbyarti);
    app.route('/comments/list')
        .get(controller.list);
    app.route('/comments/list/:id')
        .get(controller.get)
        .put(controller.comment_update)
        .delete(controller.delete)
    app.route('/comments/publish')
        .post(controller.publishComment)
};
