const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const index = require('./routers/index');
const login = require('./routers/login');
const register = require('./routers/register');

const session = expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized:true
});

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session);
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.use('/', index);
app.use('/login', login);
app.use('/register', register);

app.all('*',
  function (req, res) {
    res.status(404).send('<h1> 404 Error </h1>');
  }
);

http.listen(7777,function(){
  console.log('server on!');
});

module.exports = app;
