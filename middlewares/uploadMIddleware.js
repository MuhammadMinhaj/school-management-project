const multer = require('multer')

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname==='documents'){
            cb(null,'public/uploads/documents')
        }else if(file.fieldname==='picture'){
            cb(null,'public/uploads/images')
        }else{
            cb(null,'public/uploads')
        }
        
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+'-'+file.originalname)
    }
})
const uploads = multer({storage})
module.exports = uploads