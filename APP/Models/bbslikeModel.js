const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')


class bbsLike extends Model {

}

const bbslikeAttribute = {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
}


bbsLike.init(bbslikeAttribute, {
  sequelize,
  tableName: 'bbslike'
})

module.exports = {
  bbsLike
}