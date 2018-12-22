/*** /route/html.js

Exports a function that adds HTML API routes to the given Express app.

***/

// Require
var path = require( 'path' );

module.exports = function( app ) {

    // GET create tournament
    app.get(
        '/create-tournament' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var HTMLPath = path.join( __dirname , '../static/create-tournament.html' );
            console.log( HTMLPath );
            response.sendFile( HTMLPath );

            console.log( 'OK.' );
        }
    );

    // GET select tournament
    app.get(
        '/select-tournament' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var HTMLPath = path.join( __dirname , '../static/select-tournament.html' );
            console.log( HTMLPath );
            response.sendFile( HTMLPath );

            console.log( 'OK.' );
        }
    );

    // GET select match
    app.get(
        '/select-match-:tournamentName' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var HTMLPath = path.join( __dirname , '../static/select-match.html' );
            console.log( HTMLPath );
            response.sendFile( HTMLPath );

            console.log( 'OK.' );
        }
    );

    // GET enter match result
    app.get(
        '/enter-match-result-:tournamentName-:matchNumber' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var HTMLPath = path.join( __dirname , '../static/enter-match-result.html' );
            console.log( HTMLPath );
            response.sendFile( HTMLPath );

            console.log( 'OK.' );
        }
    );

    // GET select channel
    app.get(
        '/select-channel' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var HTMLPath = path.join( __dirname , '../static/select-channel.html' );
            console.log( HTMLPath );
            response.sendFile( HTMLPath );

            console.log( 'OK.' );
        }
    );

    // GET watch channel
    app.get(
        '/watch-channel-:tournamentName' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var HTMLPath = path.join( __dirname , '../static/watch-channel/watch-channel.html' );
            console.log( HTMLPath );
            response.sendFile( HTMLPath );

            console.log( 'OK.' );
        }
    );

}
