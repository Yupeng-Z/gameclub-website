'use strict';
const Service = require('../services/game-services');
const fileservice=require('./file-controller.js');
const userService = require('../services/user-services');
exports.playtest=(req,res)=>{
    
    let fs = require('fs');
    fs.readFile('./gamesstorage/1/unitygame.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            response.writeHead(200);
            response.write(data);
        }
        response.end();
    });
}
exports.list = (request, response) => {
    const resolve = (list) => {        
        response.status(200);
        response.json(list);
    };
    Service.search({})
        .then(resolve)
        .catch(renderErrorResponse(response));
}
exports.upload=(req,res)=>{
    Service.upload(req,res)
}
exports.delete=(req,res)=>
{
    const result = (data) => {
        res.status(200);
        res.json({
            message: " Successfully deleted"
        });
    };
    Service.delete(req.params.id)
        .then(result)
        .catch(renderErrorResponse(res));
    // const delthings = Object.assign({}, request.body);
    // //console.log(delthings.gamedetail)
    // const resolve = (list) => {        
    //     response.status(200);
    //     response.json(list);
    // };
    // console.log(delthings)
    // // if(delthings.gamedetail.gametype==='input-photo')
    // //     fileservice.delete(delthings.gamedetail.url.replace("http://localhost:3000/","./"))

    // Service.delete(request.params.id)
    //     .then(resolve)            
    //     .catch(renderErrorResponse(response));
}
/**
 *
 *
 * @param {*} request
 * @param {*} response
 */
exports.findbyauth=(request,response)=>{
    console.log(`{"author":"${request.params.id}"}`)
    const resolve = (list) => {        
        response.status(200);
        response.json(list);
    };
    Service.search({author:request.params.id})
        .then(resolve)
        .catch(renderErrorResponse(response));
}
/**
 *
 *
 * @param {*} request
 * @param {*} response
 */
exports.get = function (request, response) {
    const resolve = (list) => {
        response.status(200);
        response.json(list);
    };
    //console.log(request.params)
    Service.get(request.params.id)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 *
 *
 * @param {*} request
 * @param {*} response
 */
exports.create= function(request,response){
    
    const newthings = Object.assign({}, request.body);
    
    const resolve = (list) => {
        response.status(200);
        response.json(list);
    };
    
    Service.create(newthings)
        .then(resolve)
        .catch(renderErrorResponse(response));
}


/**
 *
 *
 * @param {*} req
 * @param {*} res
 */
exports.publishGame = (req, res) => {
    const newGame = Object.assign({}, req.body);
    const resolve = (data) => {  
        
        userService.AddGame(newGame,req._id).then(newdata=>
            {
                res.status(200);
                res.json(data);
            }
        )
      
        
    };
    Service.newGame(newGame)
        .then(resolve)
        .catch(renderErrorResponse(res));
} 
exports.uploadpic=(req,res)=>{
    Service.uploadpic(req,res)
}
exports.game_update = (req, res) => {
    const newthings = Object.assign({}, req.body);
    console.log(newthings)
    const resolve = () => {
      res.status(200);
      res.json({ "msg": 'OK'});
    };
    Service.update({_id: newthings._id}, newthings)
      .then(resolve)
      .catch(renderErrorResponse(res));
  }

/**
 *
 *
 * @param {*} res
 * @returns
 */
let renderErrorResponse = (res) => {
    const errorCallback = (error) => {
        if (error) {
            res.status(500);
            res.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};