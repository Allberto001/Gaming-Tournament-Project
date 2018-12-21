/*** fsfp-team-project-02/poc-firebase/node-push.js
***/

// Require
var firebase = require( 'firebase' );

// Initialize Firebase
var firebaseConfig = {
    apiKey : 'AIzaSyCV8bbcKO_RdS_B1TpLoVRb7tB6fVD1pwU' ,
    authDomain : 'fsfp-team-project-02.firebaseapp.com' ,
    databaseURL : 'https://fsfp-team-project-02.firebaseio.com' ,
    projectId : 'fsfp-team-project-02' ,
    storageBucket : 'fsfp-team-project-02.appspot.com' ,
    messagingSenderId : '702675547554'
};
firebase.initializeApp( firebaseConfig );

// Create tournament "folder" (root/$TOURNAMENT_NAME)
console.log( '' );
console.log( '# ref()' );
ref = firebase.database().ref( 'firebase-poc' );
console.log( ref.toString() );

console.log( '' );
console.log( '# child()' );
ref2 = ref.child( 'myKey2' );
console.log( ref2.toString() );
// ref2.set( null )
//     .then(
//         () => {
//             console.log( 'OK' );
//         }
//     );


/*
// Create messages (root/firebase-poc/messages)
var dateTimeFormatOptions = {
    year : 'numeric' ,
    month : 'numeric' ,
    day : 'numeric' ,
    hour : 'numeric' ,
    minute : 'numeric' ,
    second : 'numeric' ,
    hour12 : true
};
var dateTimeFormat = new Intl.DateTimeFormat( 'en-US' , dateTimeFormatOptions );
var sampleObject = {
    tournamnetId : 1 ,
    match : 1 ,
    player1 : 'FlaSh' ,
    player2 : 'Bisu' ,
    game1 : 'Flash' ,
    game2 : 'Bisu' ,
    game3 : 'Flash' ,
    winner : 'Flash'
}
var message = {
    timestamp : dateTimeFormat.format( new Date() ) ,
    message : JSON.stringify( sampleObject )
}

firebaseDatabaseReference = firebase.database().ref( 'firebase-poc/messages' );
firebaseDatabaseReference
    .push( message )
    .then(
        () => {
            console.log( 'Pushed message.' );
            console.log( 'message' , message );
        }
    );
*/
