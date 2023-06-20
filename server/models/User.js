const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [{ type: String, ref: 'Role' }],
    products: [
      {
        type: Schema.Types.ObjectId, // значением будет уникальный id в mongoDB
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', schema)
