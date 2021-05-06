const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')


class Admin extends Model {

}

const adminAttribute = {
  admin_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  status: { type: Sequelize.INTEGER}, // 解释状态是否合法   1: 合法 0： 不合法  2: 审核中
  // plate_number: {type: Sequelize.INTEGER}, //车牌号码
  username :{type: Sequelize.STRING}, // 账号
  password: {
    // 采取设计模式： 观察者模式
    type: Sequelize.STRING,
    // set(val) {
    //   const salt = bcrypt.genSaltSync(10)
    //   const pwd = bcrypt.hashSync(val, salt)
    //   this.setDataValue("password", pwd)
    // }
  },

}

Admin.init(adminAttribute,{
  sequelize,
  tableName: 'admin'
})

module.exports = {
  Admin
}