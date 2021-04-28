const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')


class bbsView extends Model {

}

const bbsViewAttribute = {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
}


bbsView.init(bbsViewAttribute, {
  sequelize,
  tableName: 'bbsView'
})

module.exports = {
  bbsView
}