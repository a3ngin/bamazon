DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT(5) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255),
  department_name VARCHAR(255),
  price INT(10),
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cheddar", "dairy", 24, 300),("swiss", "dairy", 15, 20),
("sloths", "animals", 3000, 220),("american", "dairy", 1, 900),
("feta", "dairy", 70, 30),("colby jack", "dairy", 40, 30),
("mozzarella", "dairy", 67, 900), ("pepper jack", "dairy", 55, 9290)
("blue cheese", "dairy", 90, 8080), ("socks", "clothing", 13, 700);
