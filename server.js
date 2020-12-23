const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "mYsqu!RRe1",
  database: "top_songsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

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

function viewDeps() {}
function viewRoles() {}
function viewEmpls() {}
function addDep() {}
function addRole() {}
function addEmpl() {}
function updateEmpl() {}

