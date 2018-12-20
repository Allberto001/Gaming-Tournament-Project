/*** /static/asset/script/Tournament.js
***/


/*** CONSTRUCTOR Tournament()
***/

var Tournament = function(
    tournamentName ,
    matchNumber ,
    player1Name ,
    player2Name ,
    player1Score ,
    player2Score ,
    winnerName
) {
    console.group( 'CONSTRUCTOR Channel()' );
    console.logValue( 'tournamentName' , tournamentName );
    console.logValue( 'matchNumber' , matchNumber );
    console.logValue( 'player1Name' , player1Name );
    console.logValue( 'player2Name' , player2Name );
    console.logValue( 'player1Score' , player1Score );
    console.logValue( 'player2Score' , player2Score );
    console.logValue( 'winnerName' , winnerName );

    this.tournamentName = tournamentName;
    this.matchNumber = matchNumber;
    if ( player1Name ) {
        this.player1Name = player1Name;
    }
    if ( player2Name ) {
        this.player2Name = player2Name;
    }
    if ( player1Score ) {
        this.player1Score = player1Score;
    }
    if ( player2Score ) {
        this.player2Score = player2Score;
    }
    if ( winnerName ) {
        this.winnerName = winnerName;
    }

    console.log( 'this' , this );
    console.groupEnd();
}
