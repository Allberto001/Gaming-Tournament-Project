/*** /static/asset/script/Tournament.js

Constructor for tournament match objects.

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
    console.group( 'CONSTRUCTOR Tournament()' );
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
    if ( player1Score !== undefined && player1Score !== null ) {
        this.player1Score = player1Score;
    }
    if ( player2Score !== undefined && player2Score !== null ) {
        this.player2Score = player2Score;
    }
    if ( winnerName ) {
        this.winnerName = winnerName;
    }

    console.log( 'this' , this );
    console.groupEnd();
}
