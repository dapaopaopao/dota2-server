const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  bg: { type: String },
  title: { type: String },
  //ref就是关联的对象 可以调用关联对象里的数据 可以同时关联多个
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },

  },
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      description: { type: String },
      tips: { type: String },
    }
  ],
  item1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  item2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
    description: { type: String },
  }]
})

module.exports = mongoose.model('Hero', schema, 'heroes')