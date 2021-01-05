/**
 * 拼车业务表
 */

const {
  sequelize
} = require('../../DB/dataBase')
const {
  Sequelize,
  Model
} = require('sequelize')


class TicketBusiness extends Model{

}


TicketBusiness.init({
  index: Sequelize.INTEGER,
  ticketId: Sequelize.INTEGER,
  type: Sequelize.INTEGER
},{
  sequelize,
  tableName: 'TickBusiness'
})


module.exports = {
   TicketBusiness
}