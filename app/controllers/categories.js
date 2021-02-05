'use strict'

module.exports = {
    findCategories: findCategories,
    createCategory: createCategory,
    findCategoriesMiddWithFilter: findCategoriesMiddWithFilter,
    responseToJson: responseToJson

}
const category = require('../models/categories')

/*
POSTMAN EXAMPLE
{
    "name": "hiking",
    "hobby_type": "sports",
    "details": "{\"equipment_required\": true, \"costs_to_practice\": 0}",
    "practice_buddies": "[{\"name\": \"Alex\"}]"
}
*/
function createCategory(req, res, next) {
    console.log("Creating category" + req.body.name);
    category.find({name: req.body.name}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);

        }
        if (result == null || result[0] == undefined){
            const h = new category({ name: req.body.name, accessCount: 1 });
            h.save(function (err, result) {
                if (err) {
                    console.log(err);
                    err.statusCode = 500
                    return next(err);

                }
                console.log("Category saved", { name: req.body.name, accessCount: 1 });
                return res.json(result);
            });
        }  else{
            const h = new category({ name: req.body.name, accessCount: result[0]?.accessCount + 1 });
            category.deleteOne(result[0], function (err, r) {
                if (err) {
                    console.log(err);
                    return res.json(err);
                }
                console.log("One categ deleted", result[0]);
                //return res.json(r);
                h.save(function (err, re) {
                    if (err) {
                        console.log(err);
                        err.statusCode = 500
                        return next(err);

                    }
                    console.log("Category saved", { name: req.body.name, accessCount: result[0]?.accessCount + 1 });
                    return res.json(re);
                });
            });
        }
    });

}

function findCategories(req, res, next) {
    console.log("Find categ midd");
    category.find(function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);

        }
        req.resources.categories = result;
        next();
    });
}

function findCategoriesMiddWithFilter(req, res, next) {
    console.log("Find categories midd with filter");
    console.log("If request query name was set => return filtered categories by name");
    console.log("If request query name was not set => return all categories");

    var filter = initNameFilter(req);
    category.find(filter, function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);

        }
        req.resources.categories = result;
        next();
    });
}

function initNameFilter(req) {
    console.log(req.query);
    var filter = {};
    if (req.query.name !== undefined) {
        filter = {name: req.query.name};
    }
    return filter;
}

/*function findHobbiesById(req, res, next) {
    hobby.find({_id: req.params.id}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log("hobby by id", result);
        return res.json(result);
    });

}*/

/*
function deleteOne(req, res, next) {
    hobby.deleteOne(req.body, function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log("One hobby deleted", req.body);
        return res.json(result);
    });

}*/


function responseToJson(prop) {
    return function (req, res, next) {
        console.log(prop);
        res.send(req.resources[prop]);
    }
}
