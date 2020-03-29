module.exports = app => {
  const express = require('express')
  const userList = require('../../models/Admin')
  const jwt = require('jsonwebtoken')

  const router = express.Router(
    {
      // 把父路由的路径合并到子路由路径，就是子路由可以使用父路由路径中req.params的一些参数
      mergeParams: true
    }
  )




  router.post('/create', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })


  router.get('/list', async (req, res, next) => {

    //把传过来的headers中的Authorization变成字符串 把后面的token取出来   后端为小写
    const token = String(req.headers.authorization || ' ').split(' ').pop()
    //解析jwt加密后的token  得到id
    const { id } = jwt.verify(token, app.get('secret'))
    //找到id对应的这条数据
    //赋值给req的话下面这个函数也能用
    req.user = await userList.findById(id)

    await next()

  }, async (req, res) => {
    // populate是把parent（本来是字符串）转换成整个关联的上级对象 这样就可以调用上级的一些属性
    const queryOptions = {}
    if (req.Model.modelName == 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })




  router.put('/edit/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })


  router.delete('/delete/:id', async (req, res) => {
    // :后面的数据都存在req.params中
    await req.Model.findByIdAndRemove(req.params.id, req.body)
    //res.send的东西存在res.data中  客户端通过res.data来获取
    res.send({
      success: 200
    })
  })


  router.get('/edit/:id', async (req, res) => {
    // :后面的数据都存在req.params中
    const model = await req.Model.findById(req.params.id)
    //res.send的东西存在res.data中  客户端通过res.data来获取
    res.send(model)
  })

  // 通用父路由
  app.use('/admin/api/rest/:resource', (req, res, next) => {
    //转换成大写单数形式 对应模型的名字
    const modelName = require('inflection').classify(req.params.resource)
    //传给子路由
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // 处理文件上传的模块
  const multer = require('multer')
  // __dirname就是绝对路径到这个文件所在位置的一个路径
  // 存到这个文件夹
  const upload = multer({ dest: __dirname + '/../../uploads' })
  // upload.single()把传过来的表单中的file文件放到req.file中
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    // filename是自动生成的
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })


  //登录路由
  app.use('/admin/api/login', async (req, res) => {

    const { username, password } = req.body

    //因为password那里的select设置为false 默认取不出来  这样就能取出来了
    user = await userList.findOne({ username }).select('+password')

    //1.检验用户名是否存在
    if (!user) {
      //返回一个对象要加status？
      return res.status(422).send({
        message: '用户不存在'
      })
    }

    //2.检验密码是否正确
    //把加密后的密码跟明文进行比较
    const isValid = require('bcryptjs').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }

    //3.返回token

    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

}