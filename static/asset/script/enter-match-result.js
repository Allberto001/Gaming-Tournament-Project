/*** /static/asset/script/enter-match-result.js
***/

// Globals
var TOURNAMENT;


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


/*** FUNCTION getMatchNumber()
***/

getMatchNumber = function() {
    console.group( 'FUNCTION getMatchNumber()' );

    var urlPathArray = window.location.pathname.split( '/' );
    var matchNumber = urlPathArray[ 2 ];

    console.logValue( 'matchNumber' , matchNumber );
    console.groupEnd();
    return matchNumber;
}


/*** FUNCTION createElements()
***/

createElements = function( tournamentName , matchNumber , tournament ) {
    console.group( 'FUNCTION createElements()' );
    console.logValue( 'tournamentName' , tournamentName );
    console.logValue( 'matchNumber' , matchNumber );
    console.logValue( 'tournament' , tournament );

    enterMatchResultHeaderJQ = $( '#enter-match-result-header' );
    enterMatchResultHeaderJQ.text( `${tournamentName} Match ${matchNumber}: Enter Match Result` );

    $( '#enter-match-result-form-winner-player1-name' ).text( tournament.player1Name );
    $( '#enter-match-result-form-winner-player2-name' ).text( tournament.player2Name );

    $( '#enter-match-result-form-player1-score-label' ).text( `${tournament.player1Name} Score` );
    $( '#enter-match-result-form-player2-score-label' ).text( `${tournament.player2Name} Score` );

    console.groupEnd();
}


/*** FUNCTION redirect()
***/

redirect = function( absolutepath ) {
    console.group( 'FUNCTION redirect()' );
    console.logValue( 'absolutepath' , absolutepath );

    window.location = ( window.location.host + absolutepath );

    console.groupEnd();
}


/*** FUNCTION getFormData()
***/

getFormData = function() {
    console.group( 'FUNCTION getFormData()' );

    var formData = {};
    formData[ 'enter-match-result-form-winner' ] = $( "#enter-match-result-form-winner" ).val();
    formData[ 'enter-match-result-form-player1-score' ] = parseInt( $( "#enter-match-result-form-player1-score" ).val() );
    formData[ 'enter-match-result-form-player2-score' ] = parseInt( $( "#enter-match-result-form-player2-score" ).val() );

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
    var winnerName = formData[ 'enter-match-result-form-winner' ];
    var player1Score = formData[ 'enter-match-result-form-player1-score' ];
    var player2Score = formData[ 'enter-match-result-form-player2-score' ];

    // get tournament match data
    var tournament = new Tournament(
        TOURNAMENT.tournamentName ,
        TOURNAMENT.matchNumber ,
        TOURNAMENT.player1Name ,
        TOURNAMENT.player2Name ,
        player1Score ,
        player2Score ,
        winnerName
    );
    console.logValue( 'tournament' , tournament );

    // winner moves on
    var nextMatchNumber = 3;
    var nextPlayer1Name = null;
    var nextPlayer2Name = null;
    if ( TOURNAMENT.matchNumber === 1 && winnerName === TOURNAMENT.player1Name ) {
        nextPlayer1Name = TOURNAMENT.player1Name;
    }
    if ( TOURNAMENT.matchNumber === 1 && winnerName === TOURNAMENT.player2Name ) {
        nextPlayer1Name = TOURNAMENT.player2Name;
    }
    if ( TOURNAMENT.matchNumber === 2 && winnerName === TOURNAMENT.player1Name ) {
        nextPlayer2Name = TOURNAMENT.player1Name;
    }
    if ( TOURNAMENT.matchNumber === 2 && winnerName === TOURNAMENT.player2Name ) {
        nextPlayer2Name = TOURNAMENT.player2Name;
    }

    var nextTournament = new Tournament(
        TOURNAMENT.tournamentName ,
        nextMatchNumber ,
        nextPlayer1Name ,
        nextPlayer2Name ,
        null ,
        null ,
        null
    );
    console.logValue( 'nextTournament' , nextTournament );

    // update tournament match
    $.ajax(
        {
            url: '/api/tournament' ,
            method : 'PUT' ,
            data : tournament
        }
    )
    .then(
        ( response ) => {
            console.logValue( 'response' , response );
            return $.ajax(
                {
                    url: '/api/tournament' ,
                    method : 'PUT' ,
                    data : nextTournament
                }
            );
        }
    )
    .then(
        ( response ) => {
            console.logValue( 'response' , response );
            redirect( `/${TOURNAMENT.tournamentName}/select-match` );
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
    var matchNumber = getMatchNumber();
    $.ajax(
        {
            url: `/api/tournament/${tournamentName}/${matchNumber}` ,
            method : 'GET'
        }
    )
    .then(
        ( tournament ) => {
            console.logValue( 'tournament' , tournament );
            TOURNAMENT = tournament;
            createElements( tournamentName , matchNumber , tournament );

            // register event handlers
            $( '#enter-match-result-form-submit' ).on( 'click' , handleSubmit );
        }
    );

    console.groupEnd();
}


/*** Run
***/

$( handleReady );    // $( document ).ready( handleReady )
