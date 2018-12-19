/*** /model/pool.js

Exports a function that returns a database model for a player pool.

A player pool defines the players to play in a tournament.

***/

module.exports = function( sequelize , DataTypes) {
    var poolModel = sequelize.define(
        "pool" ,
        {
            tournamentNumber : {
                type : DataTypes.INTEGER ,
                allowNull : false ,
                validate : {
                    isInt : true ,
                    min : 1
                }
            } ,
            playerNumber : {
                type : DataTypes.INTEGER ,
                allowNull : false ,
                validate : {
                    isInt : true ,
                    min : 1
                }
            } ,
            playerName : {
                type : DataTypes.STRING ,
                allowNull : false ,
                validate : {
                    notEmpty : true
                }
            }
        }
    );

    return poolModel;
}
