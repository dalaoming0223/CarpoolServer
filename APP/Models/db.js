const {sequelize} = require('../../DB/dataBase')

const {User} = require('../Models/userModel')
const {driverPublish, passengerPublish} = require('../Models/PublishModel')
const {BBS} = require('../Models/bbsModel')
const {bbsComment} = require('../Models/bbscommentModel')
const {bbsLike} = require('../Models/bbslikeModel')
const {bbsView} = require("../Models/bbsviewModel")
const {Driver} = require('../Models/driverModel')
const {driverPublishParticipator} = require('../Models/participatorModel')
const {contactPeople} = require('../Models/contactpeopleModel')
const {Admin} = require('../Models/adminModel')


sequelize.authenticate()
  .then(async () => {

    User.hasMany(driverPublish, {foreignKey: {name: 'user_id',allowNull: false},onDelete: 'CASCADE'}) 
    User.hasMany(passengerPublish, {foreignKey: {name: 'user_id',allowNull: false},onDelete: 'CASCADE'})
    User.hasMany(BBS, {foreignKey: {name: 'user_id',allowNull: false},onDelete: 'CASCADE'})
    User.hasMany(bbsComment, {foreignKey: {name: 'user_id',allowNull: false},onDelete: 'CASCADE'})
    User.hasMany(bbsLike, {foreignKey: {name: 'user_id',allowNull: false},onDelete: 'CASCADE'})
    User.hasMany(bbsView, {foreignKey: {name: 'user_id',allowNull: false},onDelete: 'CASCADE'})
    BBS.hasMany(bbsComment ,{foreignKey: {name: 'bbs_id', allowNull: false},as:'Comment', onDelete: 'CASCADE'})
    BBS.hasMany(bbsLike,{foreignKey: {name: 'bbs_id', allowNull: false}, onDelete: 'CASCADE'})
    BBS.hasMany(bbsView,{foreignKey: {name: 'bbs_id', allowNull: false}, onDelete: 'CASCADE'})
    // driverPublish.belongsToMany(User)
    User.hasOne(Driver,{foreignKey: {name: 'user_id',allowNull: false}, onDelete: 'CASCADE'})
    // Driver.belongsTo(User, {foreignKey: {name: 'user_id',allowNull: false}, onDelete: 'CASCADE'})
    driverPublish.hasMany(driverPublishParticipator, {foreignKey:{name: 'driverpublish_id',allowNull: false},onDelete: 'CASCADE'})
    User.hasMany(driverPublishParticipator,{foreignKey: {name: 'user_id',allowNull: false}, onDelete: 'CASCADE'})
    User.hasMany(contactPeople,{foreignKey: {name: 'user_id',allowNull: false}, onDelete: 'CASCADE'})
    
    sequelize.sync({
      // force: true
      // force: false
      // alter: true
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
    bbsComment,
    bbsLike,
    bbsView,
    Driver,
    driverPublishParticipator,
    contactPeople,
    Admin
  }