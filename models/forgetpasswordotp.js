'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForgetPasswordOtp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ForgetPasswordOtp.init({
    user_id: DataTypes.INTEGER,
    otp: DataTypes.STRING,
    expireAt: DataTypes.BIGINT,
    status: DataTypes.ENUM('active','used')
  }, {
    sequelize,
    modelName: 'ForgetPasswordOtp',
  });
  return ForgetPasswordOtp;
};