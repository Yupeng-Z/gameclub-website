
/**
 * reference: 
 */
let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    cors = require('cors');
let fs=require("fs")
try{
    fs.mkdirSync("./gamesstorage")
}
catch(err){}
try{
    fs.mkdirSync("./gamepicture")
}    
catch(err){}
try{
    fs.mkdirSync("./articlepic")
}catch(err){}
try{
    fs.mkdirSync("./tmp")
}catch{}

// mongoose instance connection url connection
// use online mongodb with my account
    mongoose.connect('mongodb+srv://roc:1234567890@cluster0-wbcmi.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    });

    //mongoose.connect('mongodb://localhost:27017/admin', {});
mongoose.Promise = global.Promise;

app.use(express.static(__dirname));//use dir
//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Initialize app
let initApp = require('./src/app');
initApp(app);

app.listen(port);

console.log('Todo server started on: ' + port);