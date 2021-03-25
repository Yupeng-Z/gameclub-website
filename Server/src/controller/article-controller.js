
'use strict';
const Service = require('../services/article-services');
const fileservice=require('./file-controller.js');
const userService = require('../services/user-services');
exports.list = (request, response) => {
    const resolve = (list) => {
        response.status(200);
        response.json(list);
    };
    Service.search({})
        .then(resolve)
        .catch(renderErrorResponse(response));
}
exports.uploadpic=(req,res)=>{
    Service.uploadpic(req,res)
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
    Service.search({auth:request.params.id})
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
exports.publishArticle = (req, res) => {
    const newArticle = Object.assign({}, req.body);
    const resolve = (newArticle) => {
        userService.AddArticle(newArticle, req._id).then(data=>{
            res.status(200)
            res.json(newArticle)
        })
      
        
    };
    Service.newArticle(newArticle, req._id)
        .then(resolve)
        .catch(renderErrorResponse(res));
}

exports.article_update = (req, res) => {
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
