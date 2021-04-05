const Sequelize = require('sequelize');
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../Config/config').database
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', //数据库类型
  host,
  port,
  logging: false,
  timezone: '+08:00',
  define: {
    // create_time && update_time
    timestamps: true,
    // delete_time
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 把驼峰命名转换为下划线
    underscored: true,
    freezeTableName: true,// Model 对应的表名将与model名相同
  }
})
module.exports = {
  sequelize
}