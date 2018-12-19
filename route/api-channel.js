/*** /route/api-channel.js

Exports a function that adds channel API routes to the given Express app.

***/

// Require
var database = require( '../model' );

module.exports = function( app ) {

    // GET all channels
    app.get(
        '/api/channel/all' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            database.channel
                .findAll( {} )
                .then(
                    ( result ) => {
                        console.log( 'Database Result :' , result );
                        console.log( 'Database Count :' , result.length );
                        response.json( result );
                        console.log( 'OK.' );
                    }
                );
        }
    );

    // GET channel by channel
    app.get(
        '/api/channel/:channel' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            database.channel
                .findOne(
                    {
                        where : {
                            channel : {
                                [ database.Sequelize.Op.eq ]: request.params.channel
                            }
                        }
                    }
                )
                .then(
                    ( result ) => {
                        console.log( 'Database Result :' , result );
                        response.json( result );
                        console.log( 'OK.' );
                    }
                );
        }
    );

    // POST new channel
    app.post(
        '/api/channel' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var channel = request.body;
            database.channel
                .create( channel )
                .then(
                    ( result ) => {
                        console.log( 'Database Result :' , result );
                        response.json( result );
                        console.log( 'OK.' );
                    }
                );
        }
    );

    // PUT update channel by ID
    app.put(
        '/api/channel/:id' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );
            response.send( 'OK.' );
            console.log( 'OK.' );
        }
    );
}
