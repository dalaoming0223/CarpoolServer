const bcrypt = require('bcryptjs')
const {
  sequelize
} = require('../../DB/dataBase')
const {
  Sequelize,
  Model
} = require('sequelize')


class User extends Model {
  static async checkEmailPassword(email, checkpassword) {
    // console.log(email, checkpassword)
    //根据Email查询用户
    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new global.errs.Notfound('该Email用户不存在')
    }

    // 验证密码
    const isCorrect = bcrypt.compareSync(checkpassword, user.password)

    if (!isCorrect) {
      throw new global.errs.AuthFailed('密码不正确')
    }

    return user
  }
  // 静态方法
  static async getUserByOpenID(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  // 静态方法
  static async createUserByOpenID(userData) {
    const user = await User.create({
      openid: userData.openid,
      avatarUrl: userData.avatarUrl,
      nickName: userData.nickName,
      nickname: userData.nickName
    })
    return user
  }

  // 静态方法
  static async getAllUser(){
    const user = await User.findAll()
    return user
  }
}

// User表初始化
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, //是否主键
    autoIncrement: true // 是否自增
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    // 采取设计模式： 观察者模式
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const pwd = bcrypt.hashSync(val, salt)
      this.setDataValue("password", pwd)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true // 是否唯一
  },
  avatarUrl: Sequelize.STRING,
  nickName: Sequelize.STRING
}, {
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}