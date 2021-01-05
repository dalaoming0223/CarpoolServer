/**
 * 拼车实体表
 */

const {
  sequelize
} = require('../../DB/dataBase')
const {
  Sequelize,
  Model
} = require('sequelize')

// 模型公共属性部分
const PublicAttribute = {
  phoneNumber: {
    type: Sequelize.INTEGER(128)
  },
  peopleNumber: {
    type: Sequelize.INTEGER(10)
  },
  status: {
    type: Sequelize.INTEGER(5)
  },
  // Reamark  TODO:备注
  remark: {
    type: Sequelize.STRING(128)
  },
  openid: {
    type: Sequelize.STRING(64),
  }
}

class DriverFindStudent extends Model {

}

DriverFindStudent.init(PublicAttribute, {
  sequelize,
  tableName: 'DriverFindStudent'
})

class StudentFindDriver extends Model {

}


StudentFindDriver.init(
  Object.assign({}, PublicAttribute), {
  sequelize,
  tableName: 'StudentFindDriver'
})

module.exports = {
  DriverFindStudent,
  StudentFindDriver
}