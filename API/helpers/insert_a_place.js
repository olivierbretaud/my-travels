const helperJson = require("../helpers/helper.json")

const mysql = require("mysql");

//connection Mysql
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PWD",
  database: "mytravels"
});

// confirm mysql connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("server is connected on mysql");
});


// // const user = "user-id" from table user
// const name = "sud Lipez";
// const src = "01.jpg";
// // const travel = "user-travel-id" from table user
// const travel = "Argentina"
// const country = "Bolivia";
// const area = "Altiplano bolivien";
// const date = "2017-06-15";
// const GPSLatitudeRef = "South";
// const GPSLatitude= "-21.416389";
// const GPSLongitudeRef="West";
// const GPSLongitude= "-66.596944";
// const altitude="0";
// const description = "En 1962, alors que règne la ségrégation, Tony Lip, un videur italo-américain ";


// const insert = `INSERT INTO places ( name, src, travel, country, area, date, GPSLatitudeRef,  GPSLatitude, GPSLongitudeRef, GPSLongitude, altitude, description ) values ( '${name}', '${src}', '${travel}', '${country}', '${area}', '${date}', '${GPSLatitudeRef}', '${GPSLatitude}', '${GPSLongitudeRef}', '${GPSLongitude}', '${altitude}', '${description}')`;

// connection.query(insert, function (err, result) {
//   if (err) throw err;
//   console.log(insert)
// })

helperJson.forEach(function(item) {

    const insert = `INSERT INTO places ( place, src, travel, country, area, date, GPSLatitudeRef,  GPSLatitude, GPSLongitudeRef, GPSLongitude, altitude, description ) values ( '${item.place}', '${item.src}', '${item.travel}', '${item.country}', '${item.area}', '${item.date}', '${item.GPSLatitudeRef}', '${item.GPSLatitude}', '${item.GPSLongitudeRef}', '${item.GPSLongitude}', '${item.altitude}', '${item.description}')`;

    connection.query(insert, function (err, result) {
        if (err) throw err;
        console.log(insert)
    })
})
