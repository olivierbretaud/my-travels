/* eslint-disable no-console */
// bash
// mysql -u root -p
// create database mytravels;
//use mytravels

//start vagrant:

// ~/vagrant/boxes/homestead$ vagrant up

//vagrant/boxes/homestead$ vagrant ssh

//vagrant@homestead:~/code/perso/my-travels/API$ nodemon index

// exit
// vagrant halt

//import express/mysql conf/port
const express = require('express'); 
const mysql = require('mysql');
const multer = require('multer');
// const upload = multer({ dest: __dirname + '/upload/images'});
const bodyParser = require('body-parser'); 
const fs =  require('fs')
const app = express();  
const port = 6999;
// port mysql =  3306

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next();
  });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({ extended: true })); 
//Connection Mysql
let connection = mysql.createConnection({
    host: '192.168.10.10',
    user: "homestead",
    password: "secret",
    database: 'my_travels'
})

// get all from places
app.get('/all', function (req, res) {
  connection.query(`SELECT * FROM places`, function (err, result) {
    if (err) throw err;
    res.send(result);
    res.end();
  });
})
// get all from places a travel
app.get('/travel-center', function (req, res) {
    connection.query(`SELECT * FROM places WHERE travel="${req.query.travel}"`, function (err, result) {
      if (err) throw err;
      res.send(result);
      res.end();
    });
})

//delete a place
app.delete('/delete-place', function (req, res) {
    connection.query(`DELETE FROM places WHERE id=${req.body.id}`, function (err, result) {
      if (err) throw err;
      console.log(req.body)
      fs.unlink("./public/"+ req.body.src, (err) => {
        if (err) {
            console.log("failed to delete local image:"+err);
        } else {
            console.log('successfully deleted local image');                                
        }
});
      res.send(result);
      res.end();
    });
})

app.delete('/delete-travel', function (req, res) {
    console.log(req.body)
    connection.query(`DELETE FROM travels WHERE travel_name="${req.body.name}"`, function (err, result) {
        console.log(`DELETE FROM travels WHERE travel_name="${req.body.name}"`)
        if (err) throw err;
      res.send(result);
      console.log(result)
      res.end();
    });
})

//create travel 
app.post('/create-travel', function (req, res) {
    const body = req.body
    connection.query(`INSERT INTO travels ( travel_name ) values ( '${body.travelName}');`, function (err, result) {
        if (err) throw err;
    })
    return res.send({
        success: true
    });
})

// get all from places
app.get('/travels-list', function (req, res) {
    connection.query(`SELECT * FROM travels`, function (err, result) {
      if (err) throw err;
      res.send(result);
      res.end();
    });
  })

//upload route 
app.post('/upload', upload.array('photos', 10 ), (req, res) => {
    const body = req.body
    let lat = 0;
    let lng = 0; 
    if (body.positionFrom === "exif") {
        const latitude =  JSON.parse(body.GPSLatitude)
        const longitude =JSON.parse(body.GPSLongitude)
        lat = ConvertDMSToDD(latitude[0], latitude[1], latitude[2], body.GPSLatitudeRef) ;
        lng = ConvertDMSToDD( longitude[0],  longitude[1],  longitude[2], body.GPSLongitudeRef) ;
    }
    else {
        lat = body.markerLat
        lng = body.markerLng
    }

    const src = req.files.map(item => {
        return '/images/' + item.filename
    })

    if (!req.files) {
        console.log("No file received");
        return res.send({
          success: false
		});
      } else {
        console.log('file received');
        connection.query(`INSERT INTO places ( place, src , travel, country, area, date, GPSLatitudeRef,  GPSLatitude, GPSLongitudeRef, GPSLongitude, altitude, description) values ( '${body.place}', '${src}', '${body.travel}', '${body.country}', '${body.area}', '${body.date}', '${body.GPSLatitudeRef}', '${lat}', '${body.GPSLongitudeRef}', '${lng}', '${body.altitude}', '${body.description}')`, function (err, result) {
            if (err) throw err;
                // console.error(result);
        })
        return res.send({
            success: true
        });
    }
});


const ConvertDMSToDD = (degrees, minutes, seconds, direction) => {
    var dd = degrees + minutes/60 +  seconds/(60*60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}

//confirm mysql Connection
connection.connect(function(err) {
    if (err) throw err; 
    // eslint-disable-next-line no-console
    console.log('server is connected on mysql');
})

//confirm connection  
app.listen(port, function() {
    console.log(`app is listening on port ${port}`)
})
