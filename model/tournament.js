/*** /model/tournament.js

Exports a function that returns tournament database model.

***/

module.exports = function( sequelize , DataTypes) {
    var tournamentModel = sequelize.define(
        "tournament" ,
        {
            tournamentName : {
                type : DataTypes.STRING ,
                allowNull : false ,
                validate : {
                    notEmpty : true
                }
            } ,
            matchNumber : {
                type : DataTypes.INTEGER ,
                allowNull : false ,
                validate : {
                    isInt : true ,
                    min : 1
                }
            } ,
            player1Name : {
                type : DataTypes.STRING ,
                allowNull : true ,
                validate : {
                    notEmpty : true
                }
            } ,
            player2Name : {
                type : DataTypes.STRING ,
                allowNull : true ,
                validate : {
                    notEmpty : true
                }
            } ,
            player1Score : {
                type : DataTypes.INTEGER ,
                allowNull : true ,
                validate : {
                    isInt : true ,
                    min : 1
                }
            } ,
            player2Score : {
                type : DataTypes.INTEGER ,
                allowNull : true ,
                validate : {
                    isInt : true ,
                    min : 1
                }
            } ,
            winnerName : {
                type : DataTypes.STRING ,
                allowNull : true ,
                validate : {
                    notEmpty : true
                }
            }
        }
    );

    return tournamentModel;
}
