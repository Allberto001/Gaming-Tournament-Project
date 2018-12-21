/*** /route/api-tournament.js

Exports a function that adds tournament API routes to the given Express app.

***/

// Require
var database = require( '../model' );
var firebase = require( 'firebase' );


module.exports = function( app ) {

    // GET all tournament matches
    app.get(
        '/api/tournament/all' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            database.tournament
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

    // GET tournament matches by tournament name
    app.get(
        '/api/tournament/:tournamentName' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            database.tournament
                .findAll(
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

    // GET tournament match by tournament name and match number
    app.get(
        '/api/tournament/:tournamentName/:matchNumber' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            database.tournament
                .findOne(
                    {
                        where : {
                            tournamentName : {
                                [ database.Sequelize.Op.eq ]: request.params.tournamentName
                            } ,
                            matchNumber : {
                                [ database.Sequelize.Op.eq ]: request.params.matchNumber
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

    // POST new tournament match
    app.post(
        '/api/tournament' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var tournament = request.body;

            // for array of tourmanent
            if ( tournament.tournaments ) {
                var iterationCounter = 0;
                var resultBuffer = [];
                var createPools = function( poolArray ) {
                    // return promise
                    return(
                        new Promise(
                            ( resolve , reject ) => {
                                console.log( '' );
                                console.log( '# createPools' );
                                iterationCounter += 1;
                                console.log( 'iterationCounter :' , iterationCounter );
                                console.log( 'poolArray :' , poolArray );
                                console.log( 'poolArray.length :' , poolArray.length );

                                // no array: do nothing
                                if ( poolArray === undefined ) {
                                    console.log( '' );
                                    console.log( '# if ( poolArray === undefined )' );

                                    resolve();
                                }
                                // no elements: do nothing
                                else if ( poolArray.length === 0 ) {
                                    console.log( '' );
                                    console.log( '# if( poolArray.length === 0 )' );

                                    resolve();
                                }
                                // add first element, recursive loop with the rest
                                else {
                                    console.log( '' );
                                    console.log( '# else' );
                                    console.log( 'Creating tournament for' , poolArray[ 0 ] );

                                    database.tournament
                                        .create( poolArray[ 0 ] )
                                        .then(
                                            ( result ) => {
                                                console.log( 'Database Result :' , result );

                                                resultBuffer.push( result );
                                                return createPools( poolArray.splice( 1 ) );
                                            }
                                        )
                                        .then(
                                            () => {
                                                resolve();
                                            }
                                        );
                                }
                            }
                        )
                    );
                }

                createPools( tournament.tournaments )
                .then(
                    () => {
                        response.json( resultBuffer );

                        console.log( 'OK.' );
                    }
                );
            }
            else {
                database.tournament
                    .create( tournament )
                    .then(
                        ( result ) => {
                            console.log( 'Database Result :' , result );

                            response.json( result );

                            console.log( 'OK.' );
                        }
                    );
            }

        }
    );

    // PUT update tournament match by tournament name and match number
    app.put(
        '/api/tournament' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var tournament = request.body;
            var databaseResult;
            database.tournament
                .update(
                    tournament ,
                    {
                        where : {
                            tournamentName : {
                                [ database.Sequelize.Op.eq ]: tournament.tournamentName
                            } ,
                            matchNumber : {
                                [ database.Sequelize.Op.eq ]: tournament.matchNumber
                            }
                        }
                    }
                )
                .then(
                    ( result ) => {
                        console.log( 'Database Result :' , result );

                        databaseResult = result;
                        return;
                    }
                )
                .then(
                    () => {
                        if ( tournament.winnerName ) {
                            console.log( 'Pushing message' );

                            message = `${tournament.tournamentName} match ${tournament.matchNumber}: ${tournament.player1Name} ${tournament.player1Score} - ${tournament.player2Score} ${tournament.player2Name}. ${tournament.winnerName} wins!`;
                            console.log( 'message' , message );

                            // Initialize Firebase
                            if ( !firebase.apps.length ) {
                                var firebaseConfig = {
                                    apiKey : process.env.FIREBASE_API_KEY ,
                                    authDomain : 'fsfp-team-project-02.firebaseapp.com' ,
                                    databaseURL : 'https://fsfp-team-project-02.firebaseio.com' ,
                                    projectId : 'fsfp-team-project-02' ,
                                    storageBucket : 'fsfp-team-project-02.appspot.com' ,
                                    messagingSenderId : '702675547554'
                                };
                                firebase.initializeApp( firebaseConfig );
                            }
                            var firebaseDatabaseReference = firebase.database().ref( tournament.tournamentName );
                            firebaseDatabaseReference
                                .push( message )
                                .then(
                                    () => {
                                        console.log( 'Pushed message.' );
                                        return;
                                    }
                                );
                        }
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
