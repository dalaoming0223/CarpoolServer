const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')



// 模型公共属性部分
const PublicAttribute = {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  phone: {type: Sequelize.STRING(64)},
  price: {type: Sequelize.STRING(10)},
  personNum: {type: Sequelize.STRING(10)},
  start_address: {type: Sequelize.STRING(64)},//下面几个属性的整合体
  start_city: {type: Sequelize.STRING(16)},
  start_district: {type: Sequelize.STRING(16)},
  start_nation: {type: Sequelize.STRING(16)},
  start_province: {type: Sequelize.STRING(16)},
  start_street: {type: Sequelize.STRING(16)},
  start_streetnumber: {type: Sequelize.STRING(16)},
  end_address: {type: Sequelize.STRING(64)},//下面几个属性的整合体
  end_city: {type: Sequelize.STRING(16)},
  end_district: {type: Sequelize.STRING(16)},
  end_nation: {type: Sequelize.STRING(16)},
  end_province: {type: Sequelize.STRING(16)},
  end_street: {type: Sequelize.STRING(16)},
  end_streetnumber: {type: Sequelize.STRING(16)}
}

class driverPublish extends Model {

}


driverPublish.init(PublicAttribute, {
  sequelize,
  tableName: 'driverPublish'
})

class passengerPublish extends Model {

}

passengerPublish.init(PublicAttribute, {
  sequelize,
  tableName: 'passengerPublish'
})
// Object.assign({}, PublicAttribute)

module.exports = {
  driverPublish,
  passengerPublish
}