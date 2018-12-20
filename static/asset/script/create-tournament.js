/*** create-tournament.js
***/


/*** FUNCTION redirect()
***/

redirect = function( relativePath ) {
    console.group( 'FUNCTION redirect()' );
    console.logValue( 'relativePath' , relativePath );

    window.location = (
        window.location.href.slice( 0 , window.location.href.lastIndexOf( '/' ) ) +
        relativePath
    );

    console.groupEnd();
}


/*** FUNCTION getFormData()
***/

getFormData = function() {
    console.group( 'FUNCTION getFormData()' );

    var formData = {};
    formData[ 'create-tournament-form-tournament-name' ] = $( "#create-tournament-form-tournament-name" ).val();
    formData[ 'create-tournament-form-channel-name' ] = $( "#create-tournament-form-channel-name" ).val();
    formData[ 'create-tournament-form-players' ] = $( "#create-tournament-form-players" ).val();

    console.logValue( 'formData' , formData );
    console.groupEnd();
    return formData;
}


/*** FUNCTION handleSubmit()
***/

handleSubmit = function( event ) {
    console.group( 'FUNCTION handleSubmit()' );
    console.logValue( 'event.type' , event.type );
    console.logValue( 'event.currentTarget.id' , event.currentTarget.id );
    console.logValue( '$( this ).attr(  \'id\' )' , $( this ).attr( 'id' ) );

    event.preventDefault();

    // get form data
    var formData = getFormData();
    var tournamentName = formData[ 'create-tournament-form-tournament-name' ];
    var channelName = formData[ 'create-tournament-form-channel-name' ];
    var players = formData[ "create-tournament-form-players" ].split( '\n' );

    // get channel data
    var channel = new Channel( channelName , tournamentName );
    console.logValue( channel );

    // get pool data
    var pools = [];
    players.forEach(
        ( player , playerIndex ) => {
            pools.push( new Pool( tournamentName , player ) );
        }
    );
    pools = { pools : pools };
    console.logValue( 'pools' , pools );

    // get tournament data
    var tournaments = [];
    tournaments.push( new Tournament ( tournamentName , 1 , players[ 0 ] , players[ 1 ] , null , null , null ) );
    tournaments.push( new Tournament ( tournamentName , 2 , players[ 2 ] , players[ 3 ] , null , null , null ) );
    tournaments.push( new Tournament ( tournamentName , 3 , null , null  , null , null , null ) );
    tournaments.push( new Tournament ( tournamentName , 4 , null , null , null , null , null ) );
    tournaments = { tournaments : tournaments };
    console.logValue( tournaments );

    // create channel
    $.post( '/api/channel' , channel )
    .then(
        ( response ) => {
            console.logValue( 'response' , response );
            return $.post( '/api/pool' , pools )
        }
    )
    .then(
        ( response ) => {
            console.logValue( 'response' , response );
            return $.post( '/api/tournament' , tournaments )
        }
    )
    .then(
        ( response ) => {
            console.logValue( 'response' , response );
            redirect( `/${tournamentName}/select-match` );
        }
    );

    console.groupEnd();
}


/*** FUNCTION handleReady()
***/

handleReady = function( event ) {
    console.group( 'FUNCTION handleReady()' );
    console.logValue( 'event' , event );

    // register event handlers
    $( '#create-tournament-form-submit' ).on( 'click' , handleSubmit );

    console.groupEnd();
}


/*** Run
***/

$( handleReady );    // $( document ).ready( handleReady )
