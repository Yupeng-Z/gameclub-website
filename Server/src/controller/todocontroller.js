'use strict'
let todoservice=require("../services/todoservice")
/**
 * Returns a list of stickies in JSON based on the
 * search parameters.
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 */
exports.list = function(req,res){
    const result=(data)=>{
        res.status(200)
        res.json(data)
    }
    todoservice.search({}).then(result).catch(renderErrorResponse(res))
}
/**
 * Creates a new things with the request JSON and
 * returns things JSON object.
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 */
exports.create = function(req,res){
    const result=(data)=>{
        res.status(201)
        res.json(data)
    }
    todoservice.create(Object.assign({}, req.body)).then(result).catch(renderErrorResponse(res))
}
/**
 * Updates and returns a things object in JSON.
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 */
exports.update = function(req,res){
    const list = Object.assign({}, req.body);
    const result=(list)=>{
        res.status(204)
        res.json(list)
    }
    list._id = req.params.id;
    todoservice.update(list).then(result).catch(renderErrorResponse(res))
};
/**
 * Deletes a object.
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 */
exports.delete = function (req, res) {
    const result = (data) => {
        res.status(200);
        res.json({
            message: " Successfully deleted"
        });
    };
    todoservice.delete(req.params.id)
        .then(result)
        .catch(renderErrorResponse(res));
};

/**
 * Returns a things object in JSON.
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 */
exports.getone = function (req, res) {
    const result = (data) => {
        res.status(200);
        res.json(data);
    };
    //console.log(request.params)
    todoservice.get(req.params.id)
        .then(result)
        .catch(renderErrorResponse(res));
};

let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};