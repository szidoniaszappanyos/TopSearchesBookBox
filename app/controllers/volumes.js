'use strict'

module.exports = {
    findVolumes: findVolumes,
    createVolume: createVolume,
    findVolumesMiddWithFilter: findVolumesMiddWithFilter,
    responseToJson: responseToJson

}
const volume = require('../models/volumes')

/*
POSTMAN EXAMPLE
{
    "name": "hiking",
    "hobby_type": "sports",
    "details": "{\"equipment_required\": true, \"costs_to_practice\": 0}",
    "practice_buddies": "[{\"name\": \"Alex\"}]"
}
*/
function createVolume(req, res, next) {
    console.log("Creating volumes" + req.body.id);
    volume.find({id: req.body.id}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);

        }
        if (result == null || result[0] === undefined){
            const h = new volume({ id: req.body.id, accessCount: 1 });
            h.save(function (err, result) {
                if (err) {
                    console.log(err);
                    err.statusCode = 500
                    return next(err);

                }
                console.log("volume saved", { id: req.body.id, accessCount: 1 });
                return res.json(result);
            });
        }  else{
            const h = new volume({ id: req.body.id, accessCount: result[0]?.accessCount + 1 });
            volume.deleteOne(result[0], function (err, r) {
                if (err) {
                    console.log(err);
                    return res.json(err);
                }
                console.log("One volume deleted", result[0]);
                //return res.json(r);
                h.save(function (err, re) {
                    if (err) {
                        console.log(err);
                        err.statusCode = 500
                        return next(err);

                    }
                    console.log("volume saved", { id: req.body.id, accessCount: result[0]?.accessCount + 1 });
                    return res.json(re);
                });
            });
        }
    });

}

function findVolumes(req, res, next) {
    console.log("Find volumes midd");
    volume.find(function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);

        }
        req.resources.volumes = result;
        next();
    });
}

function findVolumesMiddWithFilter(req, res, next) {
    console.log("Find volumes midd with filter");
    console.log("If request query name was set => return filtered volumes by volume id");
    console.log("If request query name was not set => return all volumes");

    var filter = initNameFilter(req);
    volume.find(filter, function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);

        }
        req.resources.volumes = result;
        next();
    });
}

function initNameFilter(req) {
    console.log(req.query);
    var filter = {};
    if (req.query.id !== undefined) {
        filter = {id: req.query.id};
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
