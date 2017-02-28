var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var passport = require('./auth');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(session({secret : 'keyboard', 
                saveUninitialized : true,
                resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', routes);
app.post('/login', passport.authenticate('local', {
                    failureRedirect : '/login'})
//    successRedirect : '/user/'+session.passport
, function(req, res){
            res.redirect('/user/' + req.user.username);
        });


app.use('/user', routes);
//two test pages, one sending an html(converted from jade), other just text.
app.get('/welcome', function(req,res){
    res.render('welcome');
});
app.get('/start', function(req,res){
    res.send('Hello A team!');
});



var a = 'Monty'
app.get('/name/:name?', function(req,res){
//    res.send(req.accepts(['html', 'json', 'text']));
    res.send(req.param('name',a ));
});
app.listen(5000);
