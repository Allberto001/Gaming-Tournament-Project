/*** /static/asset/script/select-match.js
***/


/*** FUNCTION getTournamentName()
***/

getTournamentName = function() {
    console.group( 'FUNCTION getTournamentName()' );

    var urlPathArray = window.location.pathname.split( '/' );
    var tournamentName = urlPathArray[ 1 ];

    console.logValue( 'tournamentName' , tournamentName );
    console.groupEnd();
    return tournamentName;
}


/*** FUNCTION createElements()
***/

createElements = function( tournamentName , tournaments ) {
    console.group( 'FUNCTION createElements()' );
    console.logValue( 'tournaments' , tournaments );

    selectMatchHeaderJQ = $( '#select-match-header' );
    selectMatchHeaderJQ.text( `${tournamentName}: Select Match` );

    selectMatchCardBody = $( '#select-match-card-body' );
    tournaments.forEach(
        ( tournament , tournamentIndex ) => {
            var divJQ = $( '<div>' )
                .attr( 'id' , `select-match-${tournament.tournamentName}-${tournament.matchNumber}` )
                .attr( 'class' , 'alert alert-secondary py-4' )
                .html( `<a href="/${tournament.tournamentName}/${tournament.matchNumber}/enter-match-result" class="alert-link">Match ${tournament.matchNumber}</a>: ${tournament.player1Name} vs ${tournament.player2Name}` );
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

    var tournamentName = getTournamentName();
    console.logValue( 'tournamentName' , tournamentName);
    $.ajax(
        {
            url: `/api/tournament/${tournamentName}` ,
            method : 'GET'
        }
    )
    .then(
        ( tournaments ) => {
            console.logValue( 'tournaments' , tournaments );
            createElements( tournamentName , tournaments );
        }
    );

    console.groupEnd();
}


/*** Run
***/

$( handleReady );    // $( document ).ready( handleReady )
