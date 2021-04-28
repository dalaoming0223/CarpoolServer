/**
 * @module 联系人数据模型
 */

 const { sequelize } = require('../../DB/dataBase')
 const { Sequelize, Model } = require('sequelize')

 class contactPeople extends Model {

 }

 const contactPeopleAttribute = {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  status: { type: Sequelize.INTEGER}, // 解释状态是否合法
  name:  {type: Sequelize.STRING},
  phone_num: {type: Sequelize.STRING, allowNull: false}
}


contactPeople.init(contactPeopleAttribute, {
  sequelize,
  tableName: 'contactpeople'
})
module.exports = {
  contactPeople
}