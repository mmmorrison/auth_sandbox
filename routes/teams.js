var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bookshelf = require('bookshelf')(knex);

var Employees = bookshelf.Model.extend({
  tableName: 'employees',
  employees: function() {
    return this.belongsTo(Teams);
  }
});

var Temes = bookshelf.Model.extend({
  tableName: 'teams',
  employees: function() {
    return this.hasMany(Employees);
  }
});

function Teams() {
  return knex('teams');
}

router.get('/', function(req, res, next) {
  Temes.fetchAll({
    withRelated: "employees"
  }).then(function(teams) {
    var teams = teams.toJSON();
    res.render("teams/index", {
      teams: teams
    });
  });
});

function test() {
  return knex('employees.name', 'teams.team_name').from('employees').innerJoin('assignments', 'employees.id', 'assignments.employee_id').innerJoin('teams', 'teams.id', 'assignments.team_id')
}


module.exports = router;
