require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

// All Routes Registared
const setRoutes = require('./routes/routes')
// All Middlewares Registared
const setMiddlewares = require('./middlewares/middlewares')

const BASE_URL = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@dream-softwares-dyvoa.mongodb.net/jasa-edu?retryWrites=true&w=majority`

const app = express()

// Set Views Engine
app.set('view engine','ejs')
app.set('views','views')

// Public Path for Use Libray
const publicLibrayPath = [
    express.static(__dirname+'/node_modules/bootstrap/dist'),
    express.static(__dirname+'/node_modules/@fortawesome/fontawesome-free'),
    express.static(__dirname+'/node_modules/jquery/dist')
]
app.use(
    publicLibrayPath
)

// Set All Middlewares
setMiddlewares(app)
// Set All Routes
setRoutes(app)



app.get('*',(req,res,next)=>{
    res.send('<h1 style="text-align:center">404 Page Not Found</h1>')
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