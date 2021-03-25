'use strict';
const todoRoute = require('./todoroute');
const userRoute = require('./user-route');
const file=require("./file-route");
const gameRoute=require("./game-route");
const articleRoute=require("./article-route")
const commentRoute=require("./comment-route")
module.exports = (app) => {
    todoRoute(app);
    userRoute(app);
    gameRoute(app);
    file(app);
    articleRoute(app);
    commentRoute(app);
};
