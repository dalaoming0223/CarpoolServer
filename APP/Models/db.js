const {sequelize} = require('../../DB/dataBase')

const {User} = require('../Models/userModel')
const {driverPublish} = require('../Models/PublishModel')

sequelize.authenticate()
  .then(async () => {
    // console.log("连接开始")

    User.hasMany(driverPublish, {foreignKey: {name: 'user_id',allowNull: false},onDelete: 'CASCADE'})
    driverPublish.belongsTo(User)
    // driverPublish.belongsToMany(User)


    sequelize.sync({
      force: false
      // alter: true 
    }).then(async () => {
      // console.log('tables created!');
    })
  }).catch(err => {
    console.error('!!!请注意!!!!Unable to connect to the database:', err);
  })


  module.exports = {
    User,
    driverPublish
  }