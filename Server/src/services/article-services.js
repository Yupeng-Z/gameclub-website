
'use strict';
const mongoose = require('mongoose');
const articles = mongoose.model('articles');
const userService = require('../services/user-services');
const fs=require("fs")
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
            const targetpath="./articlepic/"+req.params.id+fileExt
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
    const promise = articles.find(params).exec();
    return promise;
};
/**
 *
 *
 * @param {*} params
 * @returns
 */
exports.get = function (params) {
    const promise = articles.findById(params).exec();
    return promise
};

/**
 *
 *
 * @param {*} add
 * @returns
 */
exports.create = function (add) {
    const newArticle=new articles(add)
    const promise = newArticle.save(newArticle);
    return promise;
};

/**
 *
 *
 * @param {*} gameID
 * @param {*} update_content
 * @returns
 */
exports.update =function(articleID, update_content){
    const promise = articles.findByIdAndUpdate(articleID, update_content).exec();
    return promise;
}

/**
 *
 *
 * @param {*} game
 * @param {*} authorId
 * @returns
 */
exports.newArticle= (article, authorId) => {
    const promise = articles.create(article)

    return promise;
}
exports.delete = function (aid) {
    const promise = articles.remove({_id: aid});
    return promise;
};
