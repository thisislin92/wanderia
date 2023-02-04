"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Business extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Business.init(
        {
            name: DataTypes.STRING,
            latitude: DataTypes.FLOAT,
            longitude: DataTypes.FLOAT,
            description: DataTypes.TEXT,
            mapUrl: DataTypes.TEXT,
            CategoryId: DataTypes.INTEGER,
            PartnerId: DataTypes.INTEGER,
            status: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Business",
        }
    );
    Business.beforeCreate(function (business) {
        let checkLatitude = business.mapUrl.split("/");
        let check;
        checkLatitude.map(function (el) {
            if (el.includes("@")) {
                check = el.slice(1).split(",");
            }
        });
        business.latitude = check[0];
        business.longitude = check[1];
    });
    Business.beforeUpdate(function (business) {
        let checkLatitude = business.mapUrl.split("/");
        let check;
        checkLatitude.map(function (el) {
            if (el.includes("@")) {
                check = el.slice(1).split(",");
            }
        });
        business.latitude = check[0];
        business.longitude = check[1];
    });
    return Business;
};
