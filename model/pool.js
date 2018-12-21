/*** /model/pool.js

Exports a function that returns a player pool database model.

A player pool defines the players to play in a tournament.

***/

module.exports = function( sequelize , DataTypes) {
    var poolModel = sequelize.define(
        "pool" ,
        {
            tournamentName : {
                type : DataTypes.STRING ,
                allowNull : false ,
                validate : {
                    notEmpty : true
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
