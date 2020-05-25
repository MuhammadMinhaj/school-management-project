const multer = require('multer')

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+'-'+file.originalname)
    }
})
const uploads = multer({storage})
module.exports = uploads