var express = require('express');
var router = express.Router();
var pool = require('../db.js');

//route for homepage
router.get('/',(req, res) => {
  var sql = "SELECT * FROM member";
  var query = pool.query(sql, (err, results) => {
    if(err) throw err;
    res.render('member_view',{
      results: results
    });
  });
});

//route for insert data
router.post('/save',(req, res) => {
  var data = {username: req.body.username, password: req.body.password, email: req.body.email};
  var sql = "insert into member set ?";
  var query = pool.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
router.post('/update',(req, res) => {
  var sql = "update member set username='"+req.body.username+"', password='"+req.body.password+"', email='"+req.body.email+"' WHERE id ='"+req.body.id+"'";
  var query = pool.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
router.post('/delete',(req, res) => {
  var sql = "delete from member where id='"+req.body.id+"'";
  var query = pool.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

module.exports = router;