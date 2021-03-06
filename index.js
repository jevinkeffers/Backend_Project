'use strict';
// Require (import) the HTTP core Node module
const http = require("http");
//import path if using path module
const path = require("path");
//Define Hostname (points at self) and Port
const hostname = "127.0.0.1";
const port = 4444;
// Brings in all the stuff that power Express
const express = require("express");

//Bring in middleware
const morgan = require("morgan");
const logger = morgan("tiny");
const helmet = require("helmet");
const session = require("express-session");
// const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");

//ES6 renderer import
const es6Renderer = require("express-es6-template-engine");

//Initialize express
const app = express();

//Declare rendering engine, pass all html thru the renderer
app.engine("html",es6Renderer);
app.set("views","./views");
app.set("view engine","html");

//Invoke middleware logger inside the express app
app.use(logger)
app.use (helmet());
app.use(cookieParser());
//  app.use(express.static('public'));

//invoke session storage
app.use(
    session({
        // store: new FileStore(),
        secret: "awesome",
        resave: false,
        saveUninitialized: true,
        is_logged_in: false,
        cookie: {
            maxAge: 1*60*60*1000,
        }
    })
)

//Allow serving static files from public folder
app.use(express.static(path.join(__dirname, "public")));

//Method to take request body and turn it into JSON object
app.use(express.json());
//Take form data and send it to the server as a json object
app.use(express.urlencoded({extended: false}));

//Create server with express
const server = http.createServer(app);

// Tell server to listen on port
server.listen(port,hostname,() =>{
    console.log(`Server Running at http://${hostname}:${port}`)
});

app.use(express.urlencoded({
    extended: true
}))

//This is how you use the controllers
const rootController = require('./routes/index');
app.use("/",rootController);

const users = require('./routes/users');
app.use('/users',users);

const todo = require('./routes/todo');
app.use('/todo',todo);

const complete = require('./routes/complete');
app.use('/complete',complete);

const complete_inprogress = require('./routes/complete_inprogress');
app.use('/complete_inprogress',complete_inprogress);

const complete_complete = require('./routes/complete_complete');
app.use('/complete_complete',complete_complete);

const in_testing = require('./routes/in_testing');
app.use('/in_testing',in_testing);

const projects = require('./routes/projects');
app.use('/projects',projects);

const deleteProject = require('./routes/deleteproject');
app.use('/deleteproject', deleteProject);

const aboutTaskwork = require('./routes/about');
app.use('/about', aboutTaskwork);

const unauthorized = require('./routes/unauthorized');
app.use('/unauthorized', unauthorized);

