'use strict'

let Sequelize = require('sequelize')
let db = require('./db.js')

const Homes = db.define(
  'Homes',
  {
    latitude: {
      type: Sequelize.FLOAT,
      validate: {
        isFloat: true
      }
    }, 
    longitude: {
      type: Sequelize.FLOAT,
      validate: {
        isFloat: true
      }
    }
  }
)

module.exports = Homes
