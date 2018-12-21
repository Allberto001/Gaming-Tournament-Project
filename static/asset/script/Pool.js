/*** /static/asset/script/Pool.js

Constructor for player pool objects.

***/


/*** CONSTRUCTOR Pool()
***/

var Pool = function( tournamentName , playerName ) {
    console.group( 'CONSTRUCTOR Channel()' );
    console.logValue( 'tournamentName' , tournamentName );
    console.logValue( 'playerName' , playerName );

    this.tournamentName = tournamentName;
    this.playerName = playerName;

    console.log( 'this' , this );
    console.groupEnd();
}
