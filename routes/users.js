var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var bcrypt = require('bcrypt')


function Users(){
  return knex('users');
}

router.post('/', function(req, res, next) {
  console.log("users post reached");
  var crypted = bcrypt.hashSync(req.body.password, 8);
  Users().insert({email: req.body.email, password: crypted}).then(function(val){
    res.cookie("user", req.body.email, {signed: true});
    res.redirect("/tickets");
  });
});

router.post('/login', function(req, res, next) {
    Users().where({email: req.body.email}).first().then(function(found){
       if (found){
         // compareSync should only be used in low-traffic apps.
         // for production, use Bcrypt's async method:
         // bcrypt.compare(req.body.password, found.password, function(err, res) {
             // res == true
         //});

         if (bcrypt.compareSync(req.body.password, found.password)){
           res.cookie("user", req.body.email, {signed: true});
           res.redirect("/tickets");
         } else {
           res.redirect("/no_auth");
         }

       } else {
         res.redirect("/no_auth");
       }
    })
});

router.get('/', function(req, res, next) {
  Users.select().then(function(users){
    res.render("users/index", {users: users});
  });
});

module.exports = router;
