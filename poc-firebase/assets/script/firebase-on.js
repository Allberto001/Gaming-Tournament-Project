/*** fsfp-team-project-02/poc-firebase/assets/script/script.js
***/

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

// Get Firebase database (root)
/*
firebaseDatabaseReference = firebase.database().ref();
firebaseDatabaseReference
    .once( 'value' )
    .then(
        ( databaseSnapshot ) => {
            console.logValue( 'databaseSnapshot (root)' , databaseSnapshot.toJSON() );
        }
    );
*/

// Get Firebase database (root/firebase-poc)
/*
firebaseDatabaseReference = firebase.database().ref( 'firebase-poc' );
firebaseDatabaseReference
    .once( 'value' )
    .then(
        ( databaseSnapshot ) => {
            console.logValue( 'databaseSnapshot (root/firebase-poc)' , databaseSnapshot.toJSON() );
        }
    );
*/

// Get Firebase database (root/firebase-poc/messages)
firebaseDatabaseReference = firebase.database().ref( 'firebase-poc/messages' ).limitToLast( 1 );
console.logValue( 'firebaseDatabaseReference.path.toString()' , firebaseDatabaseReference.path.toString() );

/*
firebaseDatabaseReference
    .once( 'value' )
    .then(
        ( databaseSnapshot ) => {
            var databaseSnapshotJSON = databaseSnapshot.toJSON();
            console.logValue( 'databaseSnapshotJSON' , databaseSnapshotJSON );
        }
    );
*/
var globalChildSnapshot;

firebaseDatabaseReference
    .on(
        'child_added' ,
        ( childSnapshot , previousChildKey ) => {
            console.group( 'firebaseDatabaseReference.on()' );
            console.logValue( 'childSnapshot' , childSnapshot );
            console.logValue( 'previousChildKey' , previousChildKey );

            var value = childSnapshot.val();
            console.logValue( 'timestamp' , childSnapshot.val().timestamp );
            console.logValue( 'message' , childSnapshot.val().message );
            var messageObj = JSON.parse( childSnapshot.val().message );
            console.logValue( 'messageObj' , messageObj );

            console.groupEnd();
        }
    );
