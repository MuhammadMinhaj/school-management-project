const express = require('express')
const morgan = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const config = require('config')
const MongoDbStore = require('connect-mongodb-session')(session)

// Set Locals
const setLocals = require('./setLocals')

// Bind Admin With Request
const {
    bindAdminWithRequest,
    bindUserWithRequest
} = require('./adminAuthMiddleware')

const MONGO_DB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@dream-softwares-dyvoa.mongodb.net/jasa-edu?retryWrites=true&w=majority`


const store = new MongoDbStore({
    uri:MONGO_DB_URI,
    collection:'sessions',
    expires:60*60*2*1000 
})



const middlewares = [
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret:config.get('secret')||'my_secret_key',
        resave:false,
        saveUninitialized:true,
        store:store,
        cookie:{
            maxAge:60*60*2*1000
        },
    }),
    flash(),
    setLocals(),
    bindAdminWithRequest(),
    bindUserWithRequest()
]
module.exports = app =>{
    middlewares.forEach(middleware=>{
        app.use(middleware)
        if(app.get('env').toLowerCase()==='development'){
            app.use(morgan('dev'))
        }
    })
}