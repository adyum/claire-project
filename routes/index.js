var express = require('express');
var router = express.Router();
var db=require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/diapers', function(req, res, next) {
  var sql='SELECT * from diaper';
  db.query(sql,function (err, data, fields){
    if (err) throw err;
    res.render('diapers', {title: 'List of Diapers', userData: data});
  });
});

router.get('/use-diaper/:id', function(req, res, next) {
  var sql='UPDATE diaper SET quantity = quantity-1 where id = ?';
  db.query(sql,[req.params.id],function (err, data, fields){
    if (err) throw err;
    res.render('use-diaper', {title: 'List of Diapers', userData: data});
  });
});

router.get('/weight', function(req, res, next) {
  var sql='SELECT * from weight';
  db.query(sql,function (err, data, fields){
    if (err) throw err;
    res.render('weight', {title: 'Claire Weight', userData: data});
  });
});

router.get('/add-weight', function(req, res, next) {
  res.render('add-weight', {title: 'Add new weight'});
});

router.post('/add-weight', function(req, res, next) {
  var date = req.body.date;
  var pounds = req.body.pounds;
  var ounces = req.body.ounces;
  var sql = `INSERT INTO weight (date, pounds, ounces) VALUES ("${date}", "${pounds}", "${ounces}")`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect('/weight');
});
});

module.exports = router;
