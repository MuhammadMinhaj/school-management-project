module.exports = ()=>{
    return (req,res,next)=>{
        res.locals.isLoggedIn = req.session.isLoggedIn || false
        res.locals.isSecurityLoggedIn = req.session.isSecurityLoggedIn||false
        next()
    }
}