/*** /static/asset/script/enter-match-result.js
***/


/*** Globals
***/

var gTournamentName;
var gMatchNumber;
var gTournament;


/*** FUNCTION getTournamentName()
***/

getTournamentName = function() {
    console.group( 'FUNCTION getTournamentName()' );

    var pathnameSplit = window.location.pathname.split( '-' );
    var tournamentName = pathnameSplit[ pathnameSplit.length - 2 ];

    console.logValue( 'tournamentName' , tournamentName );
    console.groupEnd();
    return tournamentName;
}


/*** FUNCTION getMatchNumber()
***/

getMatchNumber = function() {
    console.group( 'FUNCTION getMatchNumber()' );

    var pathnameSplit = window.location.pathname.split( '-' );
    var matchNumber = pathnameSplit[ pathnameSplit.length - 1 ];

    console.logValue( 'matchNumber' , matchNumber );
    console.groupEnd();
    return matchNumber;
}


/*** FUNCTION createElements()
***/

createElements = function() {
    console.group( 'FUNCTION createElements()' );
    console.logValue( 'gTournamentName' , gTournamentName );
    console.logValue( 'gMatchNumber' , gMatchNumber );
    console.logValue( 'gTournament' , gTournament );

    // header
    $( '#enter-match-result-header' ).text( `${gTournamentName} Match ${gMatchNumber}: Enter Match Result` );

    // tourmament match winner options
    $( '#enter-match-result-form-winner-player1-name' ).text( gTournament.player1Name );
    $( '#enter-match-result-form-winner-player2-name' ).text( gTournament.player2Name );

    // score labels
    $( '#enter-match-result-form-player1-score-label' ).text( `${gTournament.player1Name} Score` );
    $( '#enter-match-result-form-player2-score-label' ).text( `${gTournament.player2Name} Score` );

    console.groupEnd();
}


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

    // setup update of this tournament match
    var updateThisTournament = new Tournament(
        gTournament.tournamentName ,
        gTournament.matchNumber ,
        gTournament.player1Name ,
        gTournament.player2Name ,
        player1Score ,
        player2Score ,
        winnerName
    );
    console.logValue( 'updateThisTournament' , updateThisTournament );

    // setup update of next tournament match
    var nextMatchNumber = 3;
    var nextPlayer1Name = null;
    var nextPlayer2Name = null;
    if ( gTournament.matchNumber === 1 && winnerName === gTournament.player1Name ) {
        nextPlayer1Name = gTournament.player1Name;
    }
    if ( gTournament.matchNumber === 1 && winnerName === gTournament.player2Name ) {
        nextPlayer1Name = gTournament.player2Name;
    }
    if ( gTournament.matchNumber === 2 && winnerName === gTournament.player1Name ) {
        nextPlayer2Name = gTournament.player1Name;
    }
    if ( gTournament.matchNumber === 2 && winnerName === gTournament.player2Name ) {
        nextPlayer2Name = gTournament.player2Name;
    }
    var updateNextTournament = new Tournament(
        gTournament.tournamentName ,
        nextMatchNumber ,
        nextPlayer1Name ,
        nextPlayer2Name ,
        null ,
        null ,
        null
    );
    console.logValue( 'updateNextTournament' , updateNextTournament );

    // Check if the last match
    if ( gTournament.matchNumber !== 3 ) {
        // Update next tournament match
        $.ajax(
            {
                url: '/api/tournament' ,
                method : 'PUT' ,
                data : updateNextTournament
            }
        )
        // Update this tournament match
        .then(
            ( response ) => {
                console.logValue( 'response' , response );
                return $.ajax(
                    {
                        url: '/api/tournament' ,
                        method : 'PUT' ,
                        data : updateThisTournament
                    }
                );
            }
        )
        // Redirect
        .then(
            ( response ) => {
                console.logValue( 'response' , response );

                redirect( `/select-match-${gTournament.tournamentName}` );
            }
        );
    }
    else {
        // Uupdate only this match
        $.ajax(
            {
                url: '/api/tournament' ,
                method : 'PUT' ,
                data : updateThisTournament
            }
        )
        // Redirect
        .then(
            ( response ) => {
                console.logValue( 'response' , response );

                redirect( `/select-match-${gTournament.tournamentName}` );
            }
        );
    }

    // if



    console.groupEnd();
}


/*** FUNCTION handleReady()
***/

handleReady = function( event ) {
    console.group( 'FUNCTION handleReady()' );
    console.logValue( 'event' , event );

    gTournamentName = getTournamentName();
    gMatchNumber = getMatchNumber();
    $.ajax(
        {
            url: `/api/tournament/${gTournamentName}/${gMatchNumber}` ,
            method : 'GET'
        }
    )
    .then(
        ( tournament ) => {
            console.logValue( 'tournament' , tournament );

            gTournament = tournament;
            createElements();

            // register event handlers
            $( '#enter-match-result-form-submit' ).on( 'click' , handleSubmit );
        }
    );

    console.groupEnd();
}


/*** Run
***/

$( handleReady );    // $( document ).ready( handleReady )
