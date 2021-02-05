'use strict'

module.exports = {
    createUser: createUser,
    findUsersById:findUsersById,
    deleteOne:deleteOne,
    findUsersMidd:findUsersMidd,
    responseToJson:responseToJson
}
const User = require('../models/users')

function createUser(req, res, next) {
    console.log("creating User");
    const user = new User(req.body);
    user.save(function (err, result) {
        if(err){
            console.log(err);
            return res.json(err);

        }
        console.log("User saved", req.body);
        return res.json(result);
    });
}

function findUsersMidd(req, res, next) {
    console.log("find users midd");
    User.find().exec(function (err, result) {
        if(err){
            console.log(err);
            return res.json(err);

        }
        req.resources.users = result;
        next();
    });
}

function findUsersById(req, res, next) {
    User.find(req.body).populate('hobbies', 'name hobby_type').exec(function (err, result) {
        if(err){
            console.log(err);
            return res.json(err);
        }
        console.log("User by id", result);
        return res.json(result);
    });

}

function deleteOne(req, res, next) {
    User.deleteOne(req.body, function (err, result) {
        if(err){
            console.log(err);
            return res.json(err);
        }
        console.log("one user deleted", req.body);
        return res.json(result);
    });

}


function responseToJson(prop){
    return function (req, res, next){
        console.log(prop);
        res.send(req.resources[prop]);
    }
}