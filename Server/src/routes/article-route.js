
'use strict';
//let fs=require('fs')
let controller=require('../controller/article-controller')
module.exports = function (app) {
    const jwtHelper = require('../config/jwtHelper'),
        userCtrl = require('../controller/user-controller');

    app.route('/articles')
        .get(controller.list)
        .post(controller.create)
    app.route('/articles/byauthor/:id')
        .get(controller.findbyauth);
    app.route('/articles/list')
        .get(controller.list);
    app.route('/articles/list/:id')
        .get(controller.get)
        .put(controller.article_update)
        .delete(controller.delete)
    app.route('/articles/publish')
        .post(controller.publishArticle)
    app.route('/article/uploadpic/:id')
        .post(controller.uploadpic)
};

