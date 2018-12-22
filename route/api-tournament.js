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
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            database.tournament.findAll( {} )
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

    // GET tournament matches by tournament name
    app.get(
        '/api/tournament/:tournamentName' ,
        ( request , response ) => {
            console.log();
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            database.tournament.findAll(
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
                    console.log( 'result.length =' , result.length );
                    response.json( result );
                    console.log( 'OK.' );
                    console.log();
                    return;
                }
            );
        }
    );

    // GET tournament match by tournament name and match number
    app.get(
        '/api/tournament/:tournamentName/:matchNumber' ,
        ( request , response ) => {
            console.log();
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            database.tournament.findOne(
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

    // POST new tournament match
    app.post(
        '/api/tournament' ,
        ( request , response ) => {
            console.log();
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            var tournament = request.body;

            // Check for array of tournament matches
            if ( tournament.tournaments ) {
                // Create multiple tournament matches
                var iterationCounter = 0;
                var resultBuffer = [];

                var createTournaments = function( tournaments ) {
                    // Return promise
                    return(
                        new Promise(
                            ( resolve , reject ) => {
                                console.log( '' );
                                console.log( '## createTournaments()' );
                                iterationCounter += 1;
                                console.log( 'iterationCounter =' , iterationCounter );
                                console.log( 'tournaments =' , tournaments );
                                console.log( 'tournaments.length =' , tournaments.length );

                                // No array: do nothing
                                if ( tournaments === undefined ) {
                                    console.log( '' );
                                    console.log( '### if ( tournaments === undefined )' );
                                    console.log( '' );
                                    resolve();
                                }
                                // No elements: do nothing
                                else if ( tournaments.length === 0 ) {
                                    console.log( '' );
                                    console.log( '### if( tournaments.length === 0 )' );
                                    console.log( '' );
                                    resolve();
                                }
                                // Add first element, recursive loop with the rest
                                else {
                                    console.log( '' );
                                    console.log( '### else' );
                                    console.log( 'Creating tournament match for' , tournaments[ 0 ] );

                                    database.tournament.create( tournaments[ 0 ] )
                                    .then(
                                        ( result ) => {
                                            console.log( 'result =' , result );
                                            // console.log( 'result.length =' , result.length );
                                            resultBuffer.push( result );
                                            console.log( '' );

                                            // Return promise
                                            return createTournaments( tournaments.splice( 1 ) );
                                        }
                                    )
                                    .then(
                                        () => {
                                            resolve( resultBuffer );
                                        }
                                    );
                                }
                            }
                        )
                    );
                }

                createTournaments( tournament.tournaments )
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
            else {
                // Create one tournament match
                database.tournament.create( tournament )
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

        }
    );

    // PUT update tournament match by tournament name and match number
    app.put(
        '/api/tournament' ,
        ( request , response ) => {
            console.log();
            console.log( `# Route PUT '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            var tournament = request.body;
            var databaseResult;

            database.tournament.update(
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
                    // console.log( 'result =' , result );
                    // console.log( 'result.length =' , result.length );
                    databaseResult = result;
                    return;
                }
            )
            .then(
                // Create Firebase database message
                () => {
                    if ( tournament.winnerName ) {
                        var firebaseDatabaseReference = firebase.database().ref( tournament.tournamentName );
                        var message = `${tournament.tournamentName} match ${tournament.matchNumber}: ${tournament.player1Name} vs ${tournament.player2Name} score is ${tournament.player1Score}-${tournament.player2Score}. ${tournament.winnerName} wins!`;
                        console.log( 'firebaseDatabaseReference.toString()' , firebaseDatabaseReference.toString() );
                        console.log( 'message' , message );

                        // Return promise
                        return (
                            firebaseDatabaseReference.push( message )
                            .then(
                                () => {
                                    console.log( 'Created Firebase database message.' );
                                    return;
                                }
                            )
                        );
                    }
                    else {
                        return;
                    }
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
