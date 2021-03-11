const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')


class Driver extends Model {

}

const driverAttribute = {
  driver_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  status: { type: Sequelize.INTEGER}, // 解释状态是否合法
  plate_number: {type: Sequelize.INTEGER}, //车牌号码
  plate_numberplace :{type: Sequelize.STRING}, // 粤** 京**
  phone_number: {type: Sequelize.INTEGER},
  driver_name: {type: Sequelize.STRING},
  id_card: {type: Sequelize.STRING}
}

driver.init(driverAttribute,{
  sequelize,
  tableName: 'driver'
})

module.exports = {
  Driver
}