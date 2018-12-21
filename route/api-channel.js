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

    // GET channel by tournament name
    app.get(
        '/api/channel/:tournamentName' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            database.channel
                .findOne(
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
            var databaseResult;
            database.channel
                .create( channel )
                .then(
                    ( result ) => {
                        console.log( 'Database Result :' , result );

                        databaseResult = result;
                        return;
                    }
                )
                .then(
                    () => {
                        // Initialize Firebase
                        if ( !firebase.apps.length ) {
                            var firebaseConfig = {
                                apiKey : 'AIzaSyCV8bbcKO_RdS_B1TpLoVRb7tB6fVD1pwU' ,
                                authDomain : 'fsfp-team-project-02.firebaseapp.com' ,
                                databaseURL : 'https://fsfp-team-project-02.firebaseio.com' ,
                                projectId : 'fsfp-team-project-02' ,
                                storageBucket : 'fsfp-team-project-02.appspot.com' ,
                                messagingSenderId : '702675547554'
                            };
                            firebase.initializeApp( firebaseConfig );
                        }
                        var firebaseDatabaseReference = firebase.database().ref();    // root
                        firebaseDatabaseReference
                            .child( channel.tournamentName )
                            .set( 'dummy' )
                            .then(
                                () => {
                                    console.log( 'Created tournament child.' );
                                    return;
                                }
                            );
                    }
                )
                .then(
                    () => {
                        response.json( databaseResult );

                        console.log( 'OK.' );
                    }
                );
        }
    );
}
