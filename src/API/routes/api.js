
//Dependecies
var express = require('express');
var router = express.Router();

//Routes
router.get('/products', function(req, res){
    res.send('api is working')
});

//Return router
module.exports = router;