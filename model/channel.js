/*** /model/channel.js

Exports a function that returns a channel database model.

A channel defines the Twitch.tv channel and tournament.

***/

module.exports = function( sequelize , DataTypes) {
    var channelModel = sequelize.define(
        "channel" ,
        {
            channelName : {
                type : DataTypes.STRING ,
                allowNull : false ,
                validate : {
                    notEmpty : true
                }
            } ,
            tournamentName : {
                type : DataTypes.STRING ,
                allowNull : false ,
                validate : {
                    notEmpty : true
                }
            }
        }
    );

    return channelModel;
}
