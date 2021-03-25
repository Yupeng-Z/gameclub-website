'use strict';
module.exports = function (app) {
    
    //Initialize models
    let Model = require('./models/index');

    //Initialize routes
    let Routes = require('./routes/index');
    Routes(app);
};