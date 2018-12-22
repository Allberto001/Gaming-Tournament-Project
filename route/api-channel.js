/*** /route/api-channel.js

Exports a function that adds channel API routes to the given Express app.

***/

// Require
var database = require( '../model' );
var firebase = require( 'firebase' );

module.exports = function( app ) {

    // GET all channels
    app.get(
        '/api/channel/all' ,
        ( request , response ) => {
            console.log();
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            database.channel.findAll( {} )
            .then(
                ( result ) => {
                    console.log( 'result =' , result );
                    console.log( 'result.length =' , result.length );
                    response.json( result );
                    console.log( 'OK.' );
                    console.log();
                    return;
                }
            );
        }
    );

    // GET channel by tournament name
    app.get(
        '/api/channel/:tournamentName' ,
        ( request , response ) => {
            console.log();
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            database.channel.findOne(
                {
                    where : {
                        tournamentName : {
                            [ database.Sequelize.Op.eq ]: request.params.tournamentName
                        }
                    }
                }
            )
            .then(
                ( result ) => {
                    console.log( 'result =' , result );
                    // console.log( 'result.length =' , result.length );
                    response.json( result );
                    console.log( 'OK.' );
                    console.log();
                    return;
                }
            );
        }
    );

    // POST new channel
    app.post(
        '/api/channel' ,
        ( request , response ) => {
            console.log();
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            var channel = request.body;
            var databaseResult;

            database.channel.create( channel )
            .then(
                ( result ) => {
                    console.log( 'result =' , result );
                    // console.log( 'result.length =' , result.length );
                    databaseResult = result;
                    return;
                }
            )
            .then(
                // Create Firebase database path
                () => {
                    var rootFirebaseDatabaseReference = firebase.database().ref();
                    var childFirebaseDatabaseReference = rootFirebaseDatabaseReference.child( channel.tournamentName );
                    console.log( 'rootFirebaseDatabaseReference.toString() =' , rootFirebaseDatabaseReference.toString() );
                    console.log( 'childFirebaseDatabaseReference.toString() =' , childFirebaseDatabaseReference.toString() );

                    // Return promise
                    return (
                        childFirebaseDatabaseReference.set( 'dummy' )
                        .then(
                            () => {
                                console.log( `Created Firebase database path '${childFirebaseDatabaseReference.toString()}'` );
                                return;
                            }
                        )
                    );
                }
            )
            .then(
                () => {
                    response.json( databaseResult );
                    console.log( 'OK.' );
                    console.log();
                    return;
                }
            );
        }
    );
}
