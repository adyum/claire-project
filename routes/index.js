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
  res.render('add-weight', { title: 'Express' });
});

router.get('/diaper-history', function(req, res, next) {
  var sql='SELECT * from diaper_change_log';
  db.query(sql,function (err, data, fields){
    if (err) throw err;
    res.render('diaper-history', {title: 'Claire Diaper', userData: data});
  });
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

router.post('/use-diaper', function(req, res, next) {
  const datetime = new Date().toJSON().slice(0, 19).replace('T', ' ')
  var pee = req.body.pee;
  var poop = req.body.poop;
  var size = req.body.size;
  console.log(datetime);
  var sql = `INSERT INTO diaper_change_log (date, pee, poop, diaper_size) VALUES ("${datetime}", "${pee}", "${poop}", "${size}")`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect(`/use-diaper/${size}`);
  });
});

module.exports = router;
