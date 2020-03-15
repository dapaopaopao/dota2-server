const express = require('express')

const app = express()

app.use(require('cors')())

//可以使用req.body
app.use(express.json())

require('./router/admin/index')(app)
require('./plugins/db')(app)

app.listen('3000', () => {
  console.log('服务器启动成功')
})