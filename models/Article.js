const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  title: { type: String },

  body: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],

},
  {
    //时间戳  自动记录生成时间
    timestamps: true
  })

module.exports = mongoose.model('Article', schema)