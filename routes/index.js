var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/diapers', function (req, res, next) {
  var sql = 'SELECT * from diaper';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('diapers', { title: 'List of Diapers', userData: data });
  });
});

router.get('/use-diaper/:id', function (req, res, next) {
  var sql = 'UPDATE diaper SET quantity = quantity-1 where id = ?';
  db.query(sql, [req.params.id], function (err, data, fields) {
    if (err) throw err;
    res.render('use-diaper', { title: 'List of Diapers', userData: data });
  });
});

router.get('/weight', function (req, res, next) {
  var sql = 'SELECT * from weight';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('weight', { title: 'Claire Weight', userData: data });
  });
});

router.get('/add-weight', function (req, res, next) {
  res.render('add-weight', { title: 'Express' });
});

router.get('/diaper-history', function (req, res, next) {
  var sql = 'SELECT * from diaper_change_log ORDER BY id DESC';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('diaper-history', { title: 'Claire Diaper', userData: data });
  });
});

router.post('/add-weight', function (req, res, next) {
  var date = req.body.date;
  var pounds = req.body.pounds;
  var ounces = req.body.ounces;
  var inches = req.body.inches;
  var sql = `INSERT INTO weight (date, pounds, ounces, inches) VALUES ("${date}", "${pounds}", "${ounces}", "${inches}")`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect('/weight');
  });
});

router.post('/use-diaper', function (req, res, next) {
  var dateTime = (new Date((new Date((new Date(new Date())).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace('T', ' ');
  var pee = req.body.pee;
  var poop = req.body.poop;
  var size = req.body.size;
  var sql = `INSERT INTO diaper_change_log (date, pee, poop, diaper_size) VALUES ("${dateTime}", "${pee}", "${poop}", "${size}")`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log('record inserted');
    if (size != "cloth") {
      res.redirect(`/use-diaper/${size}`);
    }
    else {
      res.redirect('/diapers');
    }
  });
});

router.get('/milk', function (req, res, next) {
  var sql = 'SELECT * from milk_log ORDER BY id DESC';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('milk', { title: 'Milk Inventory', userData: data });
  });
});


router.post('/post-milk', function (req, res, next) {
  var dateYear = new Date().toJSON().slice(0, 10);
  var ounces = req.body.ounces;
  var timeframe = req.body.timeframe;
  var vessel = req.body.vessel;
  var device = req.body.device;
  var notes = req.body.notes;
  var sql = `INSERT INTO milk_log (amount, date, timeframe, device, notes) VALUES ("${ounces}", "${dateYear}", "${timeframe}", "${device}", "${notes}")`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect(`/milk`);
  })
});

router.post('/adjust-inventory', function (req, res, next) {
  var addRemove = req.body.addRemove;
  var quantity = req.body.quantity;
  var size = req.body.size;
  var sql = `UPDATE diaper SET quantity=quantity${addRemove}${quantity} where id=${size}`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect(`/diapers`);
  })
});

router.get('/coverage', function (req, res, next) {
  var sql = 'SELECT * from coverage ORDER BY id DESC';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('coverage', { title: 'Claire Coverage', userData: data });
  });
});

router.get('/solids', function (req, res, next) {
  var sql = 'SELECT * from baby_lead ORDER BY date DESC';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('solids', { title: 'Baby Led Weaning', userData: data });
  });
});

router.post('/post-food', function (req, res, next) {
  var date = req.body.date;
  var timeframe = req.body.timeframe;
  var form = req.body.form;
  var food_type = req.body.food_type;
  var notes = req.body.notes;
  var sql = `INSERT INTO baby_lead (date, timeframe, form, food_type, notes) VALUES ("${date}", "${timeframe}", "${form}", "${food_type}", "${notes}")`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect('/solids');
  });
});

module.exports = router;
