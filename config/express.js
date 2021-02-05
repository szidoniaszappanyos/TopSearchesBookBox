module.exports =
    {
        initE: initExpress
    }

const bodyParser = require('body-parser')
const helmet = require("helmet");

function initExpress(app) {
    //helmet modules
    app.use(helmet());

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    app.use(function (req,res, next){
        req.resources = req.resources || {};
        next();
    })
}

