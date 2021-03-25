'use strict';
//import service
require('../config/passportConfig');
const userService = require('../services/user-services')
      ,passport = require('passport'),
       bcrypt = require('bcrypt');

// sign up api
exports.getUser = function (request, response) {
  const resolve = (list) => {
      response.status(200);
      response.json(list);
  };
  //console.log(request.params)
  userService.getuser(request.params.id)
      .then(resolve)
      .catch(renderErrorResponse(response));
};
exports.user_sign_up = (req, res) => {
  let newuser = {};
  newuser.email = req.body.email;
  newuser.name = req.body.name;

  let password = req.body.password,
      confirmPassword = req.body.confirmpassword;
  // check if the two pass word is the same
  if(password !== confirmPassword){
    res.status(422)
      .json({message: 'the two password must be the same!'})
    return;
  }
  // encode the pass word
  newuser.password = bcrypt.hashSync(req.body.password, 10);

  // if success, return the token
  let resolve = (signeduser) => {
    res.status(200)
      .json({'token': signeduser.generateJwt()})
  }

  // handle error
  let handleError = (res) => {
    const errorCallback = (error) => {
      if (error) {
        if(error.code === 11000){
          res.status(422).send(['Duplicate email address found.']);
        }else{
          res.status(500);
          res.json({
              message: error.message
          });
        }
      }
    }
    return errorCallback;
  };
  
  userService.signUp(newuser)
    .then(resolve)
    .catch(handleError(res));

};

//login api
exports.user_login = (req, res, next) => {
  // call for passport authentication
  // @ts-ignore
  passport.authenticate('local', (err, user, info) => {       
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) return res.status(200).json({ "token": user.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res, next);
}

exports.user_sign_out = (req, res) => {
  res.json({
    message:'Sign out successful!'
  })
}

exports.user_request_pass = (req, res) => {
  res.json({
    message:'Request pass connected!'
  })
}

exports.user_reset_pass = (req, res) => {
  res.json({
    message:'Reset pass connected!'
  })
}

exports.user_getInfo = (req, res) => {
  let resolve = (user) => {
    res.status(200)
      .json(user)
  };
  userService.getuser(req.params.id)
    .then(resolve)
    .catch(renderErrorResponse(res));
}

exports.setlike=(req,res)=>{
    let userId=req._id;
    const resolve=()=>{
    res.status(200);
    res.json({"msg": "OK"})
    };
    userService.likegame(userId,req.body)
               .then(resolve)
               .catch(renderErrorResponse(res));
}
exports.setunlike=(req,res)=>{
    let userId=req._id;
    const resolve=()=>{
    res.status(200);
    res.json({"msg": "OK"})
    };
    userService.unlikegame(userId,req.body)
               .then(resolve)
               .catch(renderErrorResponse(res));
}

/**
 * Updates the user info.
 *
 * @param request
 * @param response
*/
exports.updateUserInfo = (request, response) => {
  const userId = request.params.id;
  var updatedUser = Object.assign({}, request.body);
  updatedUser.id = userId;
  const result = (user) => {
      response.status(200);
      response.json(user);
  };
  const promise = userService.update(updatedUser);
  promise
      .then(result)
      .catch(renderErrorResponse(response));
};

exports.update_userprofile = (req, res) => {
  let update_user = req.body;
  console.log(update_user)
  const resolve = (user) => {
    res.status(200);
    res.json({ "token": user.generateJwt() , "msg": 'OK'});
  };
  userService.updateProfile({_id: req._id}, update_user)
    .then(resolve)
    .catch(renderErrorResponse(res));
}

exports.updatetest = function(req,res){
  const user = Object.assign({}, req.body);
  const result=(user)=>{
      res.status(204)
      res.json(user)
  }
  user._id = req.params.id;
  userService.update(user).then(result).catch(renderErrorResponse(res))
};


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