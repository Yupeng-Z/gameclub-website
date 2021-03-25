
'use strict';

var mongoose = require('mongoose'),
  user = mongoose.model('users');

//and signup service
exports.signUp = (newuser) => {
  const promise = user.create(newuser);
  return promise;
}


exports.getuser = (userID) => {
  const promise = user.findById(userID).exec();
  return promise;
}

exports.AddGame = (newGame, authorID) => {
  const promise = user.update({"_id": authorID},
  {
    $push: {
      games: newGame
    }
  }
  ).exec();
  return promise;
}
exports.AddArticle = (articles, authorID) => {
  const promise = user.update({"_id": authorID},
  {
    $push: {
      articles: articles
    }
  }
  ).exec();
  return promise;
}


exports.likegame=(userID,games)=>{
  const gid=games._id;
  const promise = user.update({"_id": userID},
   {$push: {
          likes:gid
    }}).exec();
     return promise;
  }
  exports.unlikegame=(userID,games)=>{
    const gid=games._id;
    const promise = user.update({"_id": userID},
     {$pull: {
            likes:gid
      }}).exec();
       return promise;
  }


/**
 * Updates an existing todo thing.
 *
 * @param updatedTodo
*/
exports.update = (updatedUserInfo) => {
  const promise = user.findByIdAndUpdate(updatedUserInfo.id, updatedUserInfo).exec();
  return promise;
};




