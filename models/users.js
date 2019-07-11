let Sequelize = require('sequelize')
let db = require('./db.js')

const Users = db.define(
  'Users',
  {
    first_name: {
      type: Sequelize.STRING,
      required: true,
      validate: {
        notEmpty: true
      }
    },
    last_name: {
      type: Sequelize.STRING,
      required: true,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.TEXT,
      required: true,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    timestamps: true
  }
)

module.exports = Users
