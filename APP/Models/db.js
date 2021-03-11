const {sequelize} = require('../../DB/dataBase')

const {User} = require('../Models/userModel')
const {driverPublish, passengerPublish} = require('../Models/PublishModel')
const {BBS} = require('../Models/bbsModel')
const {Driver} = require('../Models/driverModel')

sequelize.authenticate()
  .then(async () => {
    // console.log("连接开始")

    User.hasMany(driverPublish, {foreignKey: {name: 'user_id',allowNull: false},onDelete: 'CASCADE'})
    // driverPublish.belongsTo(User)
    
    User.hasMany(passengerPublish, {foreignKey: {name: 'user_id',allowNull: false},onDelete: 'CASCADE'})
    // passengerPublish.belongsTo(User)

    User.hasMany(BBS, {foreignKey: {name: 'user_id',allowNull: false},onDelete: 'CASCADE'})
    // BBS.belongsTo(User)



    // driverPublish.belongsToMany(User)


    sequelize.sync({
      // force: true
      // force: false
      alter: true 
    }).then(async () => {
      // console.log('tables created!');
    })
  }).catch(err => {
    console.error('!!!请注意!!!!Unable to connect to the database:', err);
  })


  module.exports = {
    User,
    driverPublish,
    passengerPublish,
    BBS,
    Driver
  }