'use strict';
//let fs=require('fs')
let controller=require('../controller/todocontroller')
module.exports = function (app) {
    
    app.route('/todos')
        .get(controller.list)
        .post(controller.create)
    app.route("/todos/:id")
        .put(controller.update)
        .delete(controller.delete)
        .get(controller.getone)
         

    // // // Routes for get, update and delete.
    // app.route('/todos/:todoid')
    //     .get(controller.get)
    //     .put(controller.put)
    //     .delete(controller.delete);
};