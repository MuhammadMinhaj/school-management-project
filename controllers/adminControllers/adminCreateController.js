exports.adminCreateGetController = (async(req,res,next)=>{
 res.render('pages/administrator/adminCreateAccount.ejs',{
     title:'Create Admin',
     style:'bg-light',
     error:{},
     flashMessage:{},
     data:req.admin
 })
})
exports.adminCreatePostController = (async(req,res,next)=>{

})