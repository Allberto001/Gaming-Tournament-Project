/*** /server.js
***/

// Require
var express = require( 'express' );

// Global variables
var DEFAULT_PORT = 8080;
var PORT = ( process.env.PORT || DEFAULT_PORT );

// Initialize Express
var app = express();

// Express data handling
app.use( express.urlencoded( { extended : true } ) );
app.use( express.json() );

// Express static directory
app.use( express.static( 'static' ) );

// Load database models
var database = require( './model' );

// Load routes
var addAPIRoutes = require( './route/api-channel.js' );
addAPIRoutes( app );
var addAPIRoutes = require( './route/api-pool.js' );
addAPIRoutes( app );
var addAPIRoutes = require( './route/api-tournament.js' );
addAPIRoutes( app );
// var addHTMLRoutes = require( './route/html.js' );
// addHTMLRoutes( app );

// Sync database model and start Express app
database.sequelize.sync(
    { force : true }
)
.then(
    () => {
        app.listen(
            PORT ,
            () => {
                console.log( `[INFO] Express app listening to http://localhost:${PORT}` );
            }
        )
    }
);
