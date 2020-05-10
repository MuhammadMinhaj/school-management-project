module.exports = ()=>{
    return (req,res,next)=>{
        res.locals.isLoggedIn = req.session.isLoggedIn || false;
        next()
    }
}