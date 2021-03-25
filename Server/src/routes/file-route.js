'use strict';
let controller=require('../controller/file-controller')

module.exports = function (app) {
    
    app.route('/download/:id')
        .get(controller.download)
};