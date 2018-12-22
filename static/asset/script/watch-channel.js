/*** /static/asset/script/select-match.js
***/


/*** Globals
***/

var gTournamentName;
var gTournaments;


/*** FUNCTION getTournamentName()
***/

getTournamentName = function() {
    console.group( 'FUNCTION getTournamentName()' );

    var pathnameSplit = window.location.pathname.split( '-' );
    var tournamentName = pathnameSplit[ pathnameSplit.length - 1 ];

    console.logValue( 'tournamentName' , tournamentName );
    console.groupEnd();
    return tournamentName;
}


/*** FUNCTION createElements()
***/

createElements = function() {
    console.group( 'FUNCTION createElements()' );
    console.logValue( 'gTournamentName' , gTournamentName );
    console.logValue( 'gTournaments' , gTournaments );

    // header
    $( '#select-match-header' ).text( `${gTournamentName}: Select Match` );

    // tournament match alerts
    selectMatchCardBody = $( '#select-match-card-body' );
    gTournaments.forEach(
        ( tournament , tournamentIndex ) => {
            var divJQ = $( '<div>' )
                .attr( 'id' , `select-match-${tournament.tournamentName}-${tournament.matchNumber}` )
                .attr( 'class' , 'alert alert-secondary py-4' )
                .html( `Match ${tournament.matchNumber}: ${tournament.player1Name} vs ${tournament.player2Name}` );
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

    gTournamentName = getTournamentName();
    console.logValue( 'gTournamentName' , gTournamentName );
    $.ajax(
        {
            url: `/api/tournament/${gTournamentName}` ,
            method : 'GET'
        }
    )
    .then(
        ( tournaments ) => {
            console.logValue( 'tournaments' , tournaments );

            gTournaments = tournaments;
            createElements();
        }
    );

    console.groupEnd();
}


/*** Run
***/

$( handleReady );    // $( document ).ready( handleReady )
