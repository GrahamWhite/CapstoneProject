let bodyParser = require('body-parser');
let mongoose = require('mongoose');


//let controller = require('./controllers/api_controller');
// let routes = require('./routes/main_route');

let express = require('express'),
    app = express(),
    port = process.env.PORT || 80;

// let Crime = require('./models/crime_model');

// // mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/dbCrime').then(msg =>{
//     console.log("Database Connected");
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes(app); //register the route

app.listen(port);


console.log('Capstone Project RESTful API server started on: ' + port);
