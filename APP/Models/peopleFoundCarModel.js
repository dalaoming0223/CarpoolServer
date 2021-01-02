const {
    sequelize
} = require('../../DB/dataBase')
const {
    Sequelize,
    Model
} = require('sequelize')

class PeopleFoundCar extends Model {

}

PeopleFoundCar.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, //是否主键
        autoIncrement: true // 是否自增
    }
  },{
    sequelize,
        tableName: 'peoplefoundcar'
    }
)

module.exports = {
  PeopleFoundCar
}