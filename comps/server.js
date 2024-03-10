require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const Expense = require('./models/Expense');
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const isLoggedIn = require('./middleware/isLoggedIn');
const flash = require('connect-flash');
const expenseUtils = require('./expenseUtils');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect("mongodb+srv://dtechking:abcd1234@financedb.8iviqrh.mongodb.net/?retryWrites=true&w=majority&appName=financedb", { useNewUrlParser: true, useUnifiedTopology: true });

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Express middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'DarshaNDaRsHaNdArShAn', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/', indexRoute);
app.use( usersRoute);
app.use('/dashboard', isLoggedIn, indexRoute);

app.set('view engine','ejs')
app.set('views', path.join(__dirname, "\\views"));


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
