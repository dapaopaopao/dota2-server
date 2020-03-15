module.exports = app => {
  const express = require('express')
  const Category = require('../../models/Category')
  const router = express.Router()




  router.post('/categories/create', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })


  router.get('/categories/list', async (req, res) => {
    // populate是把parent（本来是字符串）转换成整个关联的上级对象 这样就可以调用上级的一些属性
    const items = await Category.find().populate('parent').limit(10)
    res.send(items)
  })




  router.put('/categories/edit/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })


  router.delete('/categories/delete/:id', async (req, res) => {
    // :后面的数据都存在req.params中
    await Category.findByIdAndRemove(req.params.id, req.body)
    //res.send的东西存在res.data中  客户端通过res.data来获取
    res.send({
      success: 200
    })
  })


  router.get('/categories/edit/:id', async (req, res) => {
    // :后面的数据都存在req.params中
    const model = await Category.findById(req.params.id)
    //res.send的东西存在res.data中  客户端通过res.data来获取
    res.send(model)
  })

  app.use('/admin/api', router)
}