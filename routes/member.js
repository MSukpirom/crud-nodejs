var express = require('express');
var router = express.Router();
var pool = require('../db.js');

//route for homepage
router.get('/',(req, res) => {
  var sql = "SELECT * FROM member";
  var query = pool.query(sql, (err, results) => {
    if(err) throw err;
    res.render('product_view',{
      results: results
    });
  });
});

//route for insert data
router.post('/save',(req, res) => {
  var data = {username: req.body.username, password: req.body.password, email: req.body.email};
  var sql = "INSERT INTO member SET ?";
  var query = pool.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
router.post('/update',(req, res) => {
  var sql = "UPDATE member SET usernmae='"+req.body.username+"', password='"+req.body.password+"', email='"+req.body.email+"' WHERE id="+req.body.id;
  var query = pool.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for devare data
router.post('/devare',(req, res) => {
  var sql = "DEvarE FROM member WHERE id="+req.body.id+"";
  var query = pool.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

module.exports = router;