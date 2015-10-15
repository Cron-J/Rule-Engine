/**
 * Created by Eswer on 10/6/2015.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var ruleeditor = sequelize.define("ruleeditor", {
            /**
             Rule name of type string
             */
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            /**
             Status. It should be string and required.
             */
            rule: {
                type: DataTypes.JSON,
                allowNull: false
            }

        });
    return ruleeditor;
};
