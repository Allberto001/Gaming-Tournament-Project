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
    formData[ 'create-tournament-form-channel' ] = $( "#create-tournament-form-channel" ).val();
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
    var channel = formData[ 'create-tournament-form-channel' ];
    var players = formData[ "create-tournament-form-players" ].split( '\n' );

    // get channel data
    var channel = new Channel( channel , tournamentName );
    console.logValue( channel );

    // get pool data
    var pools = [];
    players.forEach(
        ( player , playerIndex ) => {
            var pool = new Pool( tournamentName , player );
            pools.push( pool );
        }
    );
    console.logValue( 'pools' , pools );

    // create channel
    $.post( '/api/channel' , channel )
    .then(
        ( response ) => {
            console.logValue( 'response' , response );
            return $.post( '/api/pool' , { pools : pools } )
        }
    )
    .then(
        ( response ) => {
            console.logValue( 'response' , response );
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
