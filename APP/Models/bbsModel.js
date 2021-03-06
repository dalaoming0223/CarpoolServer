const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')


class BBS extends Model {

}

const BBSAttribute = {
  bbs_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  status: { type: Sequelize.INTEGER}, // 解释状态是否合法
  content: { type: Sequelize.TEXT},
  like_count : {type: Sequelize.INTEGER,allowNull: false, defaultValue: 0},
  comment_count : {type: Sequelize.INTEGER,allowNull: false, defaultValue: 0},
  view_count : {type: Sequelize.INTEGER,allowNull: false, defaultValue: 0},
}


BBS.init(BBSAttribute, {
  sequelize,
  tableName: 'BBS'
})
module.exports = {
  BBS
}