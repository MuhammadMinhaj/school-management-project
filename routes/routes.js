
const router = [
    {
        path:'/',
        handler:(req,res,next)=>{
            res.json({message:'Assalamu Alaikum'})
        }
    }
]
module.exports = app =>{
    router.forEach(r=>{
        if(r.path ==='/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}