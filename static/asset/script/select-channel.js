/*** /static/asset/script/select-tournament.js
***/


/*** Globals
***/

var gChannels;


/*** FUNCTION createElements()
***/

createElements = function() {
    console.group( 'FUNCTION createElements()' );
    console.logValue( 'gChannels' , gChannels );

    // channel alerts
    selectMatchCardBody = $( '#select-tournament-card-body' );
    gChannels.forEach(
        ( channel , channelIndex ) => {
            var divJQ = $( '<div>' )
                .attr( 'id' , `select-tournament-${channel.tournamentName}` )
                .attr( 'class' , 'alert alert-secondary py-4' )
                .html( `<a href="watch-channel-${channel.tournamentName}" class="alert-link">${channel.tournamentName}</a> playing on ${channel.channelName}` );
            selectMatchCardBody.append( divJQ );
        }
    );

    console.groupEnd();
}


/*** FUNCTION handleReady()
***/

handleReady = function( event ) {
    console.group( 'FUNCTION handleReady()' );
    console.logValue( 'event' , event );

    $.ajax(
        {
            url: `/api/channel/all` ,
            method : 'GET'
        }
    )
    .then(
        ( channels ) => {
            console.logValue( 'channels' , channels );

            gChannels = channels;
            createElements();
        }
    );

    console.groupEnd();
}


/*** Run
***/

$( handleReady );    // $( document ).ready( handleReady )
