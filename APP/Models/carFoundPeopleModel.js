const {
  sequelize
} = require('../../DB/dataBase')
const {
  Sequelize,
  Model
} = require('sequelize')

class CarFoundPeople extends Model{

}

CarFoundPeople.init({
  id: {
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
  remark:{
    type: Sequelize.STRING(128)
  },
  openid: {
    type: Sequelize.STRING(64),
  }

},{
  sequelize,
  tableName: 'carfoundpeople'
})

// module.exports = {
//   CarFoundPeople
// }