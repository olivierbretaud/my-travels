const mysql = require("mysql");

//connection Mysql
let connection = mysql.createConnection({
  host: "192.168.10.10",
  user: "homestead",
  password: "secret",
  database: "my_travels",
});

// confirm mysql connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("server is connected on mysql");
});

const create = "CREATE TABLE IF NOT EXISTS travels (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, travel_name VARCHAR(45), GPSLatitudeRef VARCHAR(45) , GPSLatitude FLOAT, GPSLongitudeRef VARCHAR(45), GPSLongitude FLOAT, description TEXT )";

// const create = "CREATE TABLE IF NOT EXISTS places (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, place VARCHAR(45), src VARCHAR(1500), travel VARCHAR(45), country VARCHAR(45), area VARCHAR(45), date DATE, GPSLatitudeRef VARCHAR(45) , GPSLatitude FLOAT, GPSLongitudeRef VARCHAR(45), GPSLongitude FLOAT, altitude INT, description TEXT )";

connection.query(create, function (err, result) {
  if (err) throw err;
  console.log(create)
})