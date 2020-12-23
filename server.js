const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table')

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "mYsqu!RRe1",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
    // try to have it print full table here as well
});

// Prompt the first question and call functions based on response
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee's role"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all departments":
        viewDeps();
        break;

      case "View all roles":
        viewRoles();
        break;

      case "View all employees":
        viewEmpls();
        break;

      case "Add a department":
        addDep();
        break;

      case  "Add a role":
        addRole();
        break;

      case  "Add an employee":
        addEmpl();
        break;

      case  "Update an employee's role":
        updateEmpl();
        break;
      }
    });
}

function viewDeps() {
    connection.query("SELECT * FROM department")
}

function viewRoles() {
    connection.query("SELECT * FROM role")
}

function viewEmpls() {
    connection.query("SELECT * FROM employee")
}

function addDep() {}
function addRole() {}
function addEmpl() {}
function updateEmpl() {}

