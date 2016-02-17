var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Employees() {
  return knex('employees');
}

router.get('/', function(req, res, next) {
  var line1 = 'SELECT employees.name, teams.team_name FROM employees ';
  var line2 = 'JOIN assignments ON employees.id = assignments.employee_id ';
  var line3 = 'JOIN teams ON teams.id = assignments.team_id';
  var line4 = line1 + line2 + line3;

  knex.raw(line4).then(function(employees){
    employees = employees.rows;
    var people = [];
    employees.forEach(function(employee){
      in_array = people.filter(function(x){
        return x.name === employee.name;
      })
      console.log(in_array);
    });
      res.render('employees/index', {employees: employees});
    });
});

router.post('/', function(req, res, next) {
  Employees().insert(req.body).then(function (employees) {
    res.redirect('employees/');
  });
});

router.post('/:id', function(req, res, next) {
  Employees().where({id: req.params.id}).update(req.body).then(function(employees) {
    res.redirect('/');
  })
});

router.get('/new', function(req, res, next) {
  res.render('employees/new',{button_text: "Create employees"});
});

router.get('/:id', function(req, res, next) {
  res.render('employees/show', {employee: employee});
});

router.get('/:id/edit', function(req, res, next) {
  Employees().where({id: req.params.id}).then(function (employee) {
    res.render('employees/edit', {employee: employee[0], button_text: "Update employee"});
  })
});

router.get('/:id/delete', function(req, res, next) {
  Employees().where({id: req.params.id}).delete().then(function () {
    res.redirect('/employees');
  })
});

module.exports = router;
