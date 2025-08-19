//custom midleware
const authenticateMiddleware=(req,res,next)=>{
    
    if(req.headers.password ==="test"){
        //allow user to proceed
        next()
    }else{
        res.status(500).send("you are not authenticated")
    }
}

module.exports = authenticateMiddleware