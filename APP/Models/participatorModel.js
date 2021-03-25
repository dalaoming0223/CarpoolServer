const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')


const Attribute = {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  score: {type: Sequelize.INTEGER}
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