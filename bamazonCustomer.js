var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
    // purchase();
    // connection.end();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;


        var table = new Table({
            head: ["ID", "Name", "Department", "Price", "Quantity"]
            , colWidths: [20, 20, 20, 20, 20]
        });


        for (i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price,
                res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        purchase()
    });

    
}



function purchase() {

    inquirer
        .prompt([
            {
                name: "choice",
                type: "input",
                message: "What is the item ID of the product you would like to purchase?"
            },
            {
                name: "inventory",
                type: "input",
                message: "How many units of that item would you like to purchase?"
            }

        ])
        .then(function (answer) {

            connection.query("UPDATE products SET ? WHERE item_id?", answer.choice, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    if (answer.inventory < res[i].stock_quantity) {
                        var updateStock = (res[i].stock_quantity.inventory - answer.inventory);
                        var purchaseCom = (answer.choice);
                        console.log(updateStock, purchaseCom);
                    } else {
                        console.log("There wasnt enough inventory... try again!");
                        afterConnection();

                    }
                }
            });
        });
}
