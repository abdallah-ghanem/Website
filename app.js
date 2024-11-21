require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');//active put method
const cookieParser = require('cookie-parser');//help us for every thing for admin and users
const MongoStore = require('connect-mongo');
const { isActiveRoute } = require('./server/helpers/routeHelpers');
const connectDB = require('./server/config/db');
const session = require('express-session');

const app = express();
const PORT = 5000 || process.env.PORT;

//Conect to DB
connectDB();

//middelware to pass data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));// to complete requre methodOverride above

app.use(cookieParser());
app.use(session({
    secret: 'Keyboard cat',//anything do you need
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
    }),
    //cookie: { maxAge new Date ( Date.now() + 3600000 ) }
    // Date.now() - 30 * 24 * 60 * 60 * 1000
}));


app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute;

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));// to begin make code then make file in routes

app.listen(PORT, ()=>{
    console.log(`App listening to port ${PORT}`);
});