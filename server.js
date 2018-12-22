/*** /server.js

Express application main program.

***/

// Require
var express = require( 'express' );
var firebase = require( 'firebase' );

// Check environment variables
console.log();
console.log( '# Environment Variables' );
console.log( 'process.env.PORT =' , process.env.PORT );
console.log( 'process.env.NODE_ENV =' , process.env.NODE_ENV );
console.log( 'process.env.SEQUELIZE_FORCE_SYNC =' , process.env.SEQUELIZE_FORCE_SYNC );
console.log( 'process.env.FIREBASE_API_KEY =' , process.env.FIREBASE_API_KEY );
console.log( 'process.env.JAWSDB_URL =' , process.env.JAWSDB_URL );
console.log();

// Evaluate port
var defaultPort = 8080;
var port = ( process.env.PORT || defaultPort );

// Initialize Express
var app = express();

// Express data handling
app.use( express.urlencoded( { extended : true } ) );
app.use( express.json() );

// Express static directory
app.use( express.static( 'static' ) );

// Load Sequelize database models
var database = require( './model' );

// Load routes
var addAPIRoutes = require( './route/api-util.js' );
addAPIRoutes( app );
var addAPIRoutes = require( './route/api-channel.js' );
addAPIRoutes( app );
var addAPIRoutes = require( './route/api-pool.js' );
addAPIRoutes( app );
var addAPIRoutes = require( './route/api-tournament.js' );
addAPIRoutes( app );
var addHTMLRoutes = require( './route/html.js' );
addHTMLRoutes( app );

// Sync database model
database.sequelize.sync( { force : ( process.env.SEQUELIZE_FORCE_SYNC === 'true' ) } )
.then(
    // Initialize Firebase
    () => {
        var firebaseConfig = {
            apiKey : process.env.FIREBASE_API_KEY ,
            authDomain : 'fsfp-team-project-02.firebaseapp.com' ,
            databaseURL : 'https://fsfp-team-project-02.firebaseio.com' ,
            projectId : 'fsfp-team-project-02' ,
            storageBucket : 'fsfp-team-project-02.appspot.com' ,
            messagingSenderId : '702675547554'
        };
        firebase.initializeApp( firebaseConfig );
        return;
    }
)
.then(
    // Start Express app
    () => {
        app.listen(
            port ,
            () => {
                console.log( `[INFO] Express app listening to http://localhost:${port}` );
            }
        )
        return;
    }
);
