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
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            database.pool.findAll( {} )
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

    // GET player pool by tournament name
    app.get(
        '/api/pool/:tournamentName' ,
        ( request , response ) => {
            console.log();
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            database.pool.findAll(
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

    // POST new player in a pool
    app.post(
        '/api/pool' ,
        ( request , response ) => {
            console.log();
            console.log( `# Route '${request.originalUrl}'` );
            console.log( 'request.params =' , request.params );
            console.log( 'request.body =' , request.body );

            var pool = request.body;

            // Check for array of pool
            if ( pool.pools ) {
                // Create multiple pools
                var iterationCounter = 0;
                var resultBuffer = [];

                var createPools = function( pools ) {
                    // Return promise
                    return(
                        new Promise(
                            ( resolve , reject ) => {
                                console.log( '' );
                                console.log( '## createPools()' );
                                iterationCounter += 1;
                                console.log( 'iterationCounter =' , iterationCounter );
                                console.log( 'pools =' , pools );
                                console.log( 'pools.length =' , pools.length );

                                // No array: do nothing
                                if ( pools === undefined ) {
                                    console.log( '' );
                                    console.log( '### if ( pools === undefined )' );
                                    console.log( '' );
                                    resolve();
                                }
                                // No elements: do nothing
                                else if ( pools.length === 0 ) {
                                    console.log( '' );
                                    console.log( '### if( pools.length === 0 )' );
                                    console.log( '' );
                                    resolve();
                                }
                                // Add first element, recursive loop with the rest
                                else {
                                    console.log( '' );
                                    console.log( '### else' );
                                    console.log( 'Creating pool for' , pools[ 0 ] );

                                    database.pool.create( pools[ 0 ] )
                                    .then(
                                        ( result ) => {
                                            console.log( 'result =' , result );
                                            // console.log( 'result.length =' , result.length );
                                            resultBuffer.push( result );
                                            console.log( '' );

                                            // Return promise
                                            return createPools( pools.splice( 1 ) );
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

                createPools( pool.pools )
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
                // Create one pool
                database.pool.create( pool )
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
}
