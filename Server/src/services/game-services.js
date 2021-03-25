'use strict';
const mongoose = require('mongoose');
const games = mongoose.model('games');
const userService = require('../services/user-services');
const AdmZip = require('adm-zip');
const fs = require('fs');
exports.uploadpic=(req,res)=>{
    const formidable = require("formidable")
    const form = new formidable.IncomingForm()
    form.uploadDir =  './tmp';
    form.keepExtensions = true; 
    form.parse(req,function(err,fields,file){
        var filePath = '';
        if(file.tmpFile){
            filePath = file.tmpFile.path;
        } else {
            for(var key in file){
                if( file[key].path && filePath==='' ){
                    filePath = file[key].path;
                    break;
                }
            }
        }
        try{         
            var fileExt = filePath.substring(filePath.lastIndexOf('.'));
            const targetpath="./gamepicture/"+req.params.id+fileExt
            if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
                res.status(400);
                res.json("");
                return
            }
            console.log(targetpath)
            fs.rename(filePath,targetpath,function(err){
                if(err){
                    res.status("400")
                    res.json()
                    return
                }
            })
            res.status("200")
            res.json()
            return
            
        }
        catch(err){
            console.error(err)
            res.status(500)
            res.json("intern error")
        }
    })
}
/**
 *
 *
 * @param {*} params
 * @returns
 */
exports.search = function (params) {
    const promise = games.find(params).exec();
    return promise;
};
exports.upload = function(req,res){
    // console.log(req)
    const formidable = require("formidable")
    const form = new formidable.IncomingForm()
    form.uploadDir =  './tmp';
    form.keepExtensions = true; 
    form.parse(req,function(err,fields,file){
        var filePath = '';
        if(file.tmpFile){
            filePath = file.tmpFile.path;
        } else {
            for(var key in file){
                if( file[key].path && filePath==='' ){
                    filePath = file[key].path;
                    break;
                }
            }
        }
        try{
            const targetpath="./gamesstorage/"+req.params.id
            
            var fileExt = filePath.substring(filePath.lastIndexOf('.'));
            if (('.zip').indexOf(fileExt.toLowerCase()) === -1) {
                res.status(400);
                res.json("");
                return
            }
            console.log(filePath)
            var zip = new AdmZip(filePath);
            zip.extractAllTo(/*target path*/targetpath, /*overwrite*/true);            
           
            // fs.unlink(filePath)
            res.status(200)
            res.json()
            return
        }
        catch(err){
            console.error(err)
            res.status(500)
            res.json("intern error")
        }
    })
}
/**
 *
 *
 * @param {*} params
 * @returns
 */
exports.get = function (params) {
    const promise = games.findById(params).exec();
    return promise
};

/**
 *
 *
 * @param {*} add
 * @returns
 */
exports.create = function (add) {    
    const newGame=new games(add)
    const promise = newGame.save(newGame);
    return promise;
};

/**
 *
 *
 * @param {*} gameID
 * @param {*} update_content
 * @returns
 */
exports.update =function(gameID, update_content){
    const promise = games.findByIdAndUpdate(gameID, update_content).exec();
    return promise;
}

/**
 *
 *
 * @param {*} game
 * @param {*} authorId
 * @returns
 */
exports.newGame= (game) => {
    const promise = games.create(game)
    return promise;
}
exports.delete = function (gid) {
    const promise = games.remove({_id: gid});
    return promise;
};
