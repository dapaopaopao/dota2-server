module.exports = app => {
  const express = require('express')

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


  router.get('/list', async (req, res) => {
    // populate是把parent（本来是字符串）转换成整个关联的上级对象 这样就可以调用上级的一些属性
    const queryOptions = {}
    if (req.Model.modelName == 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
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
}