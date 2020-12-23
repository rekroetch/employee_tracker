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
});

// Prompt the first question and call functions based on response
function action() {
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

// shows everything in the department table
function viewDeps() {
    connection.query("SELECT * FROM department")
}

// shows everything in the role table
function viewRoles() {
    connection.query("SELECT * FROM role")
}

// shows everything in the employee table
function viewEmpls() {
    connection.query("SELECT * FROM employee")
}

function addDep() {
    // prompt for info about the department being added
  inquirer
  .prompt([
    {
      name: "newDep",
      type: "input",
      message: "What is the name of the department you are adding?"
    }
  ])
  .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      "INSERT INTO department SET ?",
      {
        name: answer.newDep,
      },
      function(err) {
        if (err) throw err;
        console.log("Department added successfully");
        // reprint all departments with new one added
        viewDeps()
        // re-prompt the user for the next action
        action();
      }
    );
  });
}

function addRole() {
    // prompt for info about the role being added
  inquirer
  .prompt([
    {
      name: "newRole",
      type: "input",
      message: "What is the title of the role you are adding?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for the role you are adding?"
    },
    {
      name: "depID",
      type: "input",
      message: "What is the department ID of the role you are adding?"
    }
  ])
  .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: answer.newRole,
        salary: answer.salary,
        department_id: answer.depID,
      },
      function(err) {
        if (err) throw err;
        console.log("Role added successfully");
        // reprint all roles with new one added
        viewRoles()
        // re-prompt the user for the next action
        action();
      }
    );
  });
}

function addEmpl() {
    // prompt for info about the employee being added
  inquirer
  .prompt([
    {
      name: "fName",
      type: "input",
      message: "What is the first name of the employee you are adding?"
    },
    {
      name: "lName",
      type: "input",
      message: "What is the last name of the employee you are adding?"
    },
    {
      name: "roleID",
      type: "input",
      message: "What is the role ID for the employee you are adding?"
    },
    {
      name: "manID",
      type: "input",
      message: "What is the manager ID for the employee you are adding?"
    },
  ])
  .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: answer.fName,
        last_name: answer.lName,
        role_id: answer.roleID,
        manager_id: answer.manID,
      },
      function(err) {
        if (err) throw err;
        console.log("Employee added successfully");
        // reprint all employees with new one added
        viewEmpls()
        // re-prompt the user for the next action
        action();
      }
    );
  });
}

function updateEmpl() {}

