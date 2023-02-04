"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class Partner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Partner.init(
        {// validate semua, email isemail, email uuniq, 
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Partner",
        }
    );
    Partner.beforeCreate(function (partner) {
        partner.password = hashPassword(partner.password);
    });
    return Partner;
};
