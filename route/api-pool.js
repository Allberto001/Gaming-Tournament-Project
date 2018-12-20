/*** /route/api-pool.js

Exports a function that adds player pool API routes to the given Express app.

***/

// Require
var database = require( '../model' );

module.exports = function( app ) {

    // GET all player pools
    app.get(
        '/api/pool/all' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            database.pool
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

    // GET player pool by tournament name
    app.get(
        '/api/pool/:tournamentName' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            database.pool
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

    // POST new player in a pool
    app.post(
        '/api/pool' ,
        ( request , response ) => {
            console.log();
            console.log( `# ${request.originalUrl}` );
            console.log( 'Parameters :' , request.params );
            console.log( 'Body :' , request.body );

            var pool = request.body;

            // check for array of pool
            if ( pool.pools ) {
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
                                    console.log( 'Creating pool for' , poolArray[ 0 ] );

                                    database.pool
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

                createPools( pool.pools )
                .then(
                    () => {
                        response.json( resultBuffer );

                        console.log( 'OK.' );
                    }
                );
            }
            else {
                database.pool
                    .create( pool )
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

}
