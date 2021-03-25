'use strict';
//let fs=require('fs')
let controller=require('../controller/game-controller')
module.exports = function (app) {
    const jwtHelper = require('../config/jwtHelper'),
        userCtrl = require('../controller/user-controller');
    
    app.route('/games')
        .get(controller.list)
        .post(controller.create)
    // app.route("/games/:id")
    //     .put(controller.update)
    //     .delete(controller.delete)
    //     .get(controller.getone)
    // app.route('/games/myspace')
    //     .post(controller.create);
      app.route('/games/byauthor/:id')
        .get(controller.findbyauth);
      app.route('/games/list')
        .get(controller.list);
      app.route('/games/list/:id')
        .get(controller.get)
        .put(controller.game_update)//update game
        .delete(controller.delete)
    //   app.route('/games/author/:id')
    //     .get(userCtrl.getUser)
        // publish artwork route
      app.route('/games/publish')
        //.post(jwtHelper.verifyJwtToken, controller.publishGame)
        .post(controller.publishGame)
      app.route("/games/upload/:id") 
        .post(controller.upload)  
      app.route("/games/uploadpic/:id")
        .post(controller.uploadpic)
    // // // Routes for get, update and delete.
    // app.route('/games/:gameid')
    //     .get(controller.get)
    //     .put(controller.put)
    //     .delete(controller.delete);
};