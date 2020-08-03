require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

// Models
const Menu = require('./models/Menu')
const WebModel = require('./models/WebModel')

// All Routes Registared
const setRoutes = require('./routes/routes')
// All Middlewares Registared
const setMiddlewares = require('./middlewares/middlewares')

const BASE_URL = process.env.MONGO_URL||`mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@dream-softwares-dyvoa.mongodb.net/jasa-edu?retryWrites=true&w=majority`

const app = express()

// Set Views Engine
app.set('view engine','ejs')
// app.set('views','views')
app.set('views', path.join(__dirname, './views'));

// Public Path for Use Libray
const publicLibrayPath = [
    express.static(__dirname+'/node_modules/bootstrap/dist'),
    express.static(__dirname+'/node_modules/@fortawesome/fontawesome-free'),
    express.static(__dirname+'/node_modules/jquery/dist'),
    express.static(__dirname+'/node_modules/axios/dist'),
    express.static(__dirname+'/dist'),
    express.static(__dirname+'/node_modules/summernote/dist'),
    express.static(__dirname+'/node_modules/swiper'),
    express.static(__dirname+'/node_modules/popper.js')
]
app.use(
    publicLibrayPath
)

// Set All Middlewares
setMiddlewares(app)
// Set All Routese
setRoutes(app)

// All Error Handler
app.use((error,req,res,next)=>{
    if(error){
        res.send('<h1 style="text-align:center;margin-top:1.5rem">Ops! Something went to wrong</h1>')
    }
})

app.get('*',async(req,res,next)=>{

    let menu  = await Menu.find()
    let webModel = await WebModel.findOne()
    res.render('pages/404.ejs',{
        title:'404 Page Not Found',
        menu,
        webModel,
    })

})

mongoose.connect(BASE_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
    .then(()=>{
        const PORT = process.env.PORT||8080
        app.listen(PORT,()=>{
            console.log(`Server is running on PORT ${PORT}`)
        })
    })
        .catch(err=>{
            if(err){
                console.log(`Failed To Database Connection`)
            }
        })