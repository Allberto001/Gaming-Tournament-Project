/*** /route/html.js

Exports a function that adds player tournament API routes to the given Express app.

***/

// Require
var path = require( 'path' );

module.exports = function( app ) {

    app.get(
        '/create-tournament' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var HTMLPath =  path.join( __dirname , '../static/create-tournament.html' );
            console.log( HTMLPath );
            response.sendFile( HTMLPath );

            console.log( 'OK.' );
        }
    );

    app.get(
        '/:tournamentName/select-match' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var HTMLPath =  path.join( __dirname , '../static/select-match.html' );
            console.log( HTMLPath );
            response.sendFile( HTMLPath );

            console.log( 'OK.' );
        }
    );

    app.get(
        '/:tournamentName/:matchNumber/enter-match-result' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var HTMLPath =  path.join( __dirname , '../static/enter-match-result.html' );
            console.log( HTMLPath );
            response.sendFile( HTMLPath );

            console.log( 'OK.' );
        }
    );

}
