const { Schema, model } = require('mongoose')

// valid-token и refresh-token будут храниться в бд для безопасности

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Token', schema)
