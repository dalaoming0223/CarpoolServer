const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')


class Driver extends Model {

}

const driverAttribute = {
  driver_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  status: { type: Sequelize.INTEGER}, // 解释状态是否合法   1: 合法 0： 不合法  2: 审核中
  // plate_number: {type: Sequelize.INTEGER}, //车牌号码
  plate_number :{type: Sequelize.STRING}, // 粤** 京**
  phone_number: {type: Sequelize.STRING},
  driver_name: {type: Sequelize.STRING},
  driver_license: {type: Sequelize.STRING}, //驾驶证照片 云存储地址
  driver_license_http: {type: Sequelize.STRING}, //驾驶证照片 http地址
  car_type: {type: Sequelize.STRING}, //车型
  id_card: {type: Sequelize.STRING}, // 身份证号码
  id_card_img: {type: Sequelize.STRING}, // 身份证照片 云存储地址
  id_card_img_http: {type: Sequelize.STRING} // 身份证照片  http地址
}

Driver.init(driverAttribute,{
  sequelize,
  tableName: 'driver'
})

module.exports = {
  Driver
}