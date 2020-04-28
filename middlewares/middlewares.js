const express = require('express')
const morgan = require('morgan')
const middlewares = [
    morgan('dev')
]
module.exports = app =>{
    middlewares.forEach(middleware=>{
        app.use(middleware)
    })
}