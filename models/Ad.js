const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  title: { type: String },

  images: [
    {
      image: { type: String },
      url: { type: String }
    }],


})

module.exports = mongoose.model('Ad', schema)