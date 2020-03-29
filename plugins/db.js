module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.set('useFindAndModify', false)
  mongoose.connect('mongodb://127.0.0.1:27017/data2-node-vue', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  //这样就直接引用了所有模型 避免有些相互关联的模型没有引入
  //其他地方要用的时候
  //const mongoose = require(mongoose)    然后用mongoose.model('模型名字')就可以使用这个模型了
  require('require-all')(__dirname + '/../models/')


}