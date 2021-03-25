'use strict';
//let fs=require('fs')
let controller=require('../controller/user-controller')
const jwtHelper = require('../config/jwtHelper')
module.exports = function (app) {
    
    app.route('/auth/sign-up')
        .post(controller.user_sign_up);
    app.route('/auth/login')
        .post(controller.user_login);
    app.route('/auth/sign-out')
        .post(controller.user_sign_out);
    app.route('/auth/request-pass')
        .post(controller.user_request_pass);
    app.route('/auth/reset-pass')
        .post(controller.user_reset_pass);
        
    app.route('/auth/:id')
        .get(controller.user_getInfo)//homepage
        //.put(controller.updateUserInfo);
        .put(controller.updatetest);

    // app.route('/auth/update-profile')
    //     .put(jwtHelper.verifyJwtToken, controller.update_userprofile);
};