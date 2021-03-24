const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')

class driverPublish extends Model {

}

class driverPublishParticipants extends Model {}


class passengerPublish extends Model {

}

// 模型公共属性部分
const PublicAttribute = {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  phone: {type: Sequelize.STRING(64)},
  price: {type: Sequelize.STRING(10)},
  personNum: {type: Sequelize.STRING(10)},
  start_time: {type: Sequelize.STRING(32)},
  note: {type: Sequelize.STRING(10)},
  start_name: {type: Sequelize.STRING(64)},
  start_address: {type: Sequelize.STRING(64)},//下面几个属性的整合体
  start_city: {type: Sequelize.STRING(64)},
  start_district: {type: Sequelize.STRING(64)},
  start_nation: {type: Sequelize.STRING(64)},
  start_province: {type: Sequelize.STRING(64)},
  start_street: {type: Sequelize.STRING(64)},
  start_streetnumber: {type: Sequelize.STRING(64)},
  start_latitude:{type: Sequelize.FLOAT(9,6) },
  start_longitude:{type: Sequelize.FLOAT(9,6) },
  end_latitude:{type: Sequelize.FLOAT(9,6) },
  end_longitude:{type: Sequelize.FLOAT(9,6) },
  end_name: {type: Sequelize.STRING(64)},
  end_address: {type: Sequelize.STRING(64)},//下面几个属性的整合体
  end_city: {type: Sequelize.STRING(64)},
  end_district: {type: Sequelize.STRING(64)},
  end_nation: {type: Sequelize.STRING(64)},
  end_province: {type: Sequelize.STRING(64)},
  end_street: {type: Sequelize.STRING(64)},
  end_streetnumber: {type: Sequelize.STRING(64)},
  status: {type: Sequelize.STRING(64)}
}


driverPublish.init(PublicAttribute, {
  sequelize,
  tableName: 'driverPublish'
})

driverPublishParticipants.init(
  {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  },
  {
    sequelize,
    tableName: 'driverPublishParticipants'
  }
)

passengerPublish.init(PublicAttribute, {
  sequelize,
  tableName: 'passengerPublish'
})
// Object.assign({}, PublicAttribute)

module.exports = {
  driverPublish,
  passengerPublish
}