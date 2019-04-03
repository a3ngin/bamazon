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
    connection.end();
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

    });
}



// table is an Array, so you can `push`, `unshift`, `splice` and friends


// 6. The app should then prompt users with two messages.

// * The first should ask them the ID of the product they would like to buy.
// * The second message should ask how many units of the product they would like to buy.


function purchase() {
    // prompt for ID of item to be purchased and how many to be purchased
    inquirer
        .prompt([
            {
                name: "productID",
                type: "input",
                message: "What is the ID of the product you would like to purchase?"
            },
            {
                name: "inventory",
                type: "input",
                message: "How many units of that item would you like to purchase?"
            }

        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO table ?",
                {
                    item_name: answer.item,
                    category: answer.category,
                    starting_bid: answer.startingBid || 0,
                    highest_bid: answer.startingBid || 0
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your auction was created successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            );
        });
}
