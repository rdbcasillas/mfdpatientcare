var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Ibrahim' });
});

router.get('/bootstrap_demo/loginform', function(req, res) {
    res.render('bootstrap_demo/loginform', {title: 'Bootstrap Login Demo'});
});

router.get('/bootstrap_demo/peoplelist', function(req, res) {
    res.render('bootstrap_demo/peoplelist', {title: 'Bootstrap List Demo'});
});

//Route for the login page
router.get('/login', function(req, res){
    res.render('login', {title : 'Log In'});
});

//Route for the user page which redirects to login if no session with user
router.get('/user/:userId', function(req,res){
    if (req.session.passport.user == undefined){
        res.redirect('/login');
    }else {
        res.render('user', {title : 'Welcome',
            user : req.user
        })
    }
});
module.exports = router;
