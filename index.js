const express = require('express')

const app = express()

app.use(require('cors')())

//可以使用req.body
app.use(express.json())

//设置一个app的属性 secret    返回token时用   可以用app.get('secret')获取到
app.set('secret', 'ad79a87d9sad9')

// 托管静态文件  相当于别名 把前面的给省了    __dirname是根路径到这个文件路径  路径的指代
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./router/admin/index')(app)
require('./plugins/db')(app)
require('./router/web/index')(app)

app.listen('3000', () => {
  console.log('服务器启动成功')
})