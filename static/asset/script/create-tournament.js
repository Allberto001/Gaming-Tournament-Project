/*** /static/asset/script/create-tournament.js
***/


/*** FUNCTION redirect()
***/

redirect = function( absolutePath ) {
    console.group( 'FUNCTION redirect()' );
    console.logValue( 'absolutePath' , absolutePath );

    var newURL = `${window.location.origin}${absolutePath}`;
    console.logValue( 'newURL' , newURL );

    window.location = newURL;

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

    // setup new channel
    var newChannel = new Channel( channelName , tournamentName );
    console.logValue( 'newChannel' , newChannel );

    // setup new player pool
    var newPools = [];
    players.forEach(
        ( player , playerIndex ) => {
            newPools.push( new Pool( tournamentName , player ) );
        }
    );
    newPools = { pools : newPools };
    console.logValue( 'newPools' , newPools );

    // setup new tournament matches
    var newTournaments = [];
    newTournaments.push( new Tournament ( tournamentName , 1 , players[ 0 ] , players[ 1 ] , null , null , null ) );
    newTournaments.push( new Tournament ( tournamentName , 2 , players[ 2 ] , players[ 3 ] , null , null , null ) );
    newTournaments.push( new Tournament ( tournamentName , 3 , null , null  , null , null , null ) );
    newTournaments = { tournaments : newTournaments };
    console.logValue( 'newTournaments' , newTournaments );

    // create new channel
    $.ajax(
        {
            url: '/api/channel' ,
            method : 'POST' ,
            data : newChannel
        }
    )
    // create new player pool
    .then(
        ( response ) => {
            console.logValue( 'response' , response );

            return $.ajax(
                {
                    url: '/api/pool' ,
                    method : 'POST' ,
                    data : newPools
                }
            );
        }
    )
    // create new tournament matches
    .then(
        ( response ) => {
            console.logValue( 'response' , response );

            return $.ajax(
                {
                    url: '/api/tournament' ,
                    method : 'POST' ,
                    data : newTournaments
                }
            );
        }
    )
    // redirect page
    .then(
        ( response ) => {
            console.logValue( 'response' , response );

            redirect( '/select-tournament' );
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
