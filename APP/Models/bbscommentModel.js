const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')

class bbsComment extends Model {

}


const bbsCommentAttribute = {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},

  content: {type: Sequelize.STRING(100), allowNull: false},

  // // 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
  // state: {type: Sequelize.SMALLINT, allowNull: false, defaultValue: 1},

  is_top: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
}


bbsComment.init(bbsCommentAttribute, {
  sequelize,
  tableName: 'bbscomment'
})

module.exports = {
  bbsComment
}