const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    //这样就不会被查到 选到
    select: false,
    set(val) {
      // 这个是散列模块，把密码变成哈希值，10是加密程度
      return require('bcryptjs').hashSync(val, 10)
    }
  }
}



)

module.exports = mongoose.model('Admin', schema)