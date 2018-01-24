var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.post('/recordings', function(req, res, next) {
    console.log(req.body);
    console.log('Route');
    res.sendStatus(200);
});

module.exports = router;
