/*** Channel.js
***/


/*** CONSTRUCTOR Channel()
***/

var Channel = function( channel , tournamentName ) {
    console.group( 'CONSTRUCTOR Channel()' );
    console.logValue( 'channel' , channel );
    console.logValue( 'tournamentName' , tournamentName );

    this.channel = channel;
    this.tournamentName = tournamentName;

    console.log( this , 'this' );
    console.groupEnd();
}
