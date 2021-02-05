'use strict'

const path = require('path');

module.exports = {
    initRoutes: initRoutes
}

function initRoutes(app){
    const routesPath = path.join(__dirname, '../app/routes');
    const routes = ['users', 'categories', 'volumes'];

    routes.forEach(function (route){
        console.log("route", route);
        app.use(require(`${routesPath}/${route}`));
    })
}
