const { sequelize } = require('../../DB/dataBase')
const { Sequelize, Model } = require('sequelize')


class BBS extends Model {

}

const BBS_Attribute = {
  bbs_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  status: { type: Sequelize.INTEGER}, // 解释状态是否合法
  content: { type: Sequelize.TEXT}
}


BBS.init(BBS_Attribute, {
  sequelize,
  tableName: 'BBS'
})
module.exports = {
  BBS
}