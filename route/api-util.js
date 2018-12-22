/*** /route/api-util.js

Exports a function that adds utility API routes to the given Express app.

***/

// Require
var database = require( '../model' );


module.exports = function( app ) {

    // GET environment variable
    app.get(
        '/api/util/env/:key' ,
        ( request , response ) => {
            console.log();
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            // Allowed environment variables
            var whitelist = [ 'NODE_ENV' , 'FIREBASE_API_KEY' , 'SEQUELIZE_FORCE_SYNC' , 'JAWSDB_URL' ];

            // Find and return environment variable
            var result = {};
            result[ request.params.key ] = process.env[ request.params.key ];
            console.log( 'result' , result );
            response.json( result );

            console.log( 'OK.' );
            console.log();
        }
    );
}
