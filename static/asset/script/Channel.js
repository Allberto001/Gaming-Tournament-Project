/*** /static/asset/script/Channel.js
***/


/*** CONSTRUCTOR Channel()
***/

var Channel = function( channelName , tournamentName ) {
    console.group( 'CONSTRUCTOR channelName()' );
    console.logValue( 'channelName' , channelName );
    console.logValue( 'tournamentName' , tournamentName );

    this.channelName = channelName;
    this.tournamentName = tournamentName;

    console.log( this , 'this' );
    console.groupEnd();
}
