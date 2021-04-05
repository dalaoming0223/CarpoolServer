const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')


const Attribute = {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  score: {type: Sequelize.INTEGER}, // 对订单的评分
  join_status : {type: Sequelize.INTEGER},
  join_time: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW}
}
class driverPublishParticipator extends Model{
  
}


driverPublishParticipator.init(Attribute,{
  sequelize,
  tableName: 'driverPublishParticipator'
})


module.exports = {
  driverPublishParticipator
}