/*** /static/asset/script/select-match.js
***/


/*** Globals
***/

var gTournamentName;
var gChannel;
var gTournaments;
var gFirebaseDatabaseReference;

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


/*** FUNCTION initializeTwitch()
***/

initializeTwitch = function() {
    console.group( 'FUNCTION initializeTwitch()' );
    console.logValue( 'gChannel' , gChannel );

    var embed = new Twitch.Embed(
        'twitch-embed' ,
        {
            width: 854,
            height: 480,
            channel: gChannel.channelName ,
            layout: "video-with-chat",
            autoplay: false
        }
    );

    embed.addEventListener(
        Twitch.Embed.VIDEO_READY ,
        () => {
            var player = embed.getPlayer();
            player.play();
        }
    );

    console.groupEnd();
}


/*** FUNCTION updateBracket()
***/

updateBracket = function() {
    console.group( 'FUNCTION updateBracket()' );
    console.logValue( 'gTournaments' , gTournaments );

    if ( gTournaments[ 0 ].player1Name ) {
        $( '#match-1-player-1' ).text( gTournaments[ 0 ].player1Name );
    }
    if ( gTournaments[ 0 ].player2Name ) {
        $( '#match-1-player-2' ).text( gTournaments[ 0 ].player2Name );
    }
    if ( gTournaments[ 1 ].player1Name ) {
        $( '#match-2-player-1' ).text( gTournaments[ 1 ].player1Name );
    }
    if ( gTournaments[ 1 ].player2Name ) {
        $( '#match-2-player-2' ).text( gTournaments[ 1 ].player2Name );
    }
    if ( gTournaments[ 2 ].player1Name ) {
        $( '#match-3-player-1' ).text( gTournaments[ 2 ].player1Name );
    }
    if ( gTournaments[ 2 ].player2Name ) {
        $( '#match-3-player-2' ).text( gTournaments[ 2 ].player2Name );
    }
    if ( gTournaments[ 2 ].winnerName ) {
        $( '#match-3-winner' ).text( gTournaments[ 2 ].winnerName );
    }

    console.groupEnd();
}


/*** FUNCTION initializeFirebase()
***/

initializeFirebase = function() {
    console.group( 'FUNCTION initializeFirebase()' );
    console.logValue( 'gChannel' , gChannel );

    // Initialize Firebase
    $.ajax(
        {
            url: '/api/util/env/FIREBASE_API_KEY' ,
            method : 'GET'
        }
    )
    .then(
        ( result ) => {
            console.logValue( 'result' , result );

            var firebaseConfig = {
                apiKey : result ,
                authDomain : 'fsfp-team-project-02.firebaseapp.com' ,
                databaseURL : 'https://fsfp-team-project-02.firebaseio.com' ,
                projectId : 'fsfp-team-project-02' ,
                storageBucket : 'fsfp-team-project-02.appspot.com' ,
                messagingSenderId : '702675547554'
            };
            firebase.initializeApp( firebaseConfig );
            gFirebaseDatabaseReference = firebase.database().ref( gChannel.tournamentName ).limitToLast( 1 );
            console.logValue( 'gFirebaseDatabaseReference.toString()' , gFirebaseDatabaseReference.toString() );
            gFirebaseDatabaseReference
            .on(
                'child_added' ,
                ( childSnapshot , previousChildKey ) => {
                    console.group( 'firebaseDatabaseReference.on()' );
                    console.logValue( 'childSnapshot' , childSnapshot );
                    console.logValue( 'previousChildKey' , previousChildKey );
                    console.logValue( 'childSnapshot.val()' , childSnapshot.val() );

                    var message = childSnapshot.val();
                    $( '#live-updates' ).append( $( '<p>' ).text( message ) );

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
                            updateBracket();

                            // return;
                        }
                    );
                }
            );

            return;
        }
    );

    console.groupEnd();
}


/*** FUNCTION createElements()
***/

createElements = function() {
    console.group( 'FUNCTION createElements()' );
    console.logValue( 'gTournamentName' , gTournamentName );
    console.logValue( 'gTournaments' , gTournaments );

    initializeTwitch();
    updateBracket();
    initializeFirebase();

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
            url: `/api/channel/${gTournamentName}` ,
            method : 'GET'
        }
    )
    .then(
        ( channel ) => {
            console.logValue( 'channel' , channel );

            gChannel = channel;
            return;
        }
    )
    .then(
        () => {
            return $.ajax(
                {
                    url: `/api/tournament/${gTournamentName}` ,
                    method : 'GET'
                }
            );
        }
    )
    .then(
        ( tournaments ) => {
            console.logValue( 'tournaments' , tournaments );

            gTournaments = tournaments;
            return;
        }
    )
    .then(
        () => {
            createElements();
        }
    )
    ;

    console.groupEnd();
}


/*** Run
***/

$( handleReady );    // $( document ).ready( handleReady )
