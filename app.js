var express = require('express');
var bodyParser = require("body-parser");
var multer = require('multer');
var flash = require('connect-flash')
// var cookieParser = require('cookie-parser')
var customConfig = multer.diskStorage({
    destination: function(req, res, next){
       
        next(null, './uploads')
    },
    filename: function(req, file, next){
        // var filename = Date.now();
        // switch(file.mimetype) {
            //     case 'image/png':
            //     filename = filename + '.png';
            //     break;
        //     case 'image/jpeg':
        //     filename = filename + '.jpeg';
        //     break;
        //     default:
        //     break;
        // }
        next(null, Math.random() +'-' +  file.originalname)
    }
})

var upload = multer({storage: customConfig})

var session = require('express-session')
var passport = require('passport')
var PassportFacebook = require('passport-facebook').Strategy
// var User = require('../models/User');
// var LocalStrategy = require('Passport-local').Strategy

var server = express();

// server.use(express.static('./frontend'))
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())


server.use(session({ secret: "secret-word" }));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

// server.configure(function() {
    // server.use(express.cookieParser('keyboard cat'));
    // server.use(express.session({ cookie: { maxAge: 60000 }}));
//   });

var users = [
    { id: 1, username: "umar", password: 'abcd1234' },
    { id: 2, username: "test", password: '1234' },
    { id: 3, username: "mud", password: '12345' },
]



// passport.use(new LocalStrategy(
//     function (username, password, next) {

//         var user = users.find( (user) => {
//             return user.username === username && user.password === password;
//         })

//         if (user) {
//             next(null, user);
//         } else {
//             next(null, false, {error: {'email or password':'is invalid'}});
//         }

//     }
// ));


var FACEBOOK_APP_ID = '999166826958502';
var FACEBOOK_APP_SECRET='0f010a18918140e024dadf3346dc830d';

var fbOpts = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:4050/auth/facebook/callback',
    profileFields: ['email']
};
var fbCallback = function (accessToken, refreshToken, profile, cb){
    
    console.log(accessToken, refreshToken, profile)

    // User.findOrCreate({name: profile.displayName}, {name: profile.displayName, userid: profile.id},
    //      function(err, user) {
    //     if (err) { return next(err); }
    //     next(null, user);
    // });
}

passport.use(new PassportFacebook(fbOpts, fbCallback))


// server.get('/', (req, res)=>{
//     res.send(passport.authenticate('facebook', {scope: ['email']}))
// })

server.get('/auth/facebook/callback', passport.authenticate('facebook', (err, user, info)=>{
    console.log(err, user, info)    
    })).listen(4050, ()=>{console.log("Server is successfully started on port 4050")})
    

// passport.serializeUser(function (user, next) {
//     next(null, user.id);
// });

// passport.deserializeUser(function (id, next) {
//     var user = users.find((user) => {
//         return user.id === id;
//     })

//     next(null, user);
// });

// server.get('/Login', (req, res) => {
    // const flashMessage = res.locals.getMessages();
    // console.log('flash', 'Hello')
//     res.sendFile(__dirname + '/sign.html')
// });

// server.post('/login', passport.authenticate('local',{successRedirect: '/dashboard', 
// failureRedirect: '/login', failureFlash: true})
// ); 


// server.get('/dashboard', function (req, res) {

//     if (!req.isAuthenticated()) {
        // res.send("Login Required to visit this page")
    //     res.sendFile(__dirname + '/login.html')
    // } else {
    //     res.sendFile(__dirname + '/dashboard.html')
        // res.send("Yes you're logged in, and your data is available here: " + req.user.username   )
    // }

// });

// server.get('/flash', function(req, res){
    // Set a flash message by passing the key, followed by the value, to req.flash().
    // req.flash('info', 'Flash is back!')
    // res.redirect('/');
//   });
  
//   server.get('/', function(req, res){
    // Get an array of flash messages by passing the key to req.flash()
//     res.render('index', { messages: req.flash('info') });
//   });
 
// server.post('/addUser', (req, res)=>{

    
//     let newUser = {id: req.body.id, username: req.body.username, password: req.body.password} 
//     users.push(newUser)
//     res.end('User is added')
// })

// server.post('/profile', upload.single('profilePicture'), function(req, res, next){
//      console.log(req.file)
//      res.send('files is successfully uploaded')
// })


// server.get('', (req, res)=>{

//     res.send("My server is Ready to use")

// })
