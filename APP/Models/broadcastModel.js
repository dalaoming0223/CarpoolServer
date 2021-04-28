/**
 * @Model 广播数据模型
 */
const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')

class Broadcast extends Model {

}

const BroadcastAttribute = {
  broadcast_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  status: { type: Sequelize.INTEGER}, // 解释状态是否合法
  content: { type: Sequelize.TEXT},
}


Broadcast.init(BroadcastAttribute, {
  sequelize,
  tableName: 'broadcast'
})
module.exports = {
  Broadcast
}