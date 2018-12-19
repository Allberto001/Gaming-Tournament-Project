/*** /model/channel.js

Exports a function that returns a database model for a channel.

A channel defines the Twitch.tv channel and the tournament currently running, if any.

***/

module.exports = function( sequelize , DataTypes) {
    var ChannelModel = sequelize.define(
        "channel" ,
        {
            channel : {
                type : DataTypes.STRING ,
                allowNull : false ,
                validate : {
                    notEmpty : true
                }
            } ,
            tournamnetId : {
                type : DataTypes.INTEGER ,
                allowNull : true
            }
        }
    );

    return ChannelModel;
}
