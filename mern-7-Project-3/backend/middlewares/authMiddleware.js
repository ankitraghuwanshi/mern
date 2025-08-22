const jwt =require("jsonwebtoken")
const { JWT_SECRET } = process.env 

function authMiddleware(req, res, next){
    try {
        //extract the token from my request "Bearer xxxxxxxxxxxx"
        const token = req.headers.authorization.split(" ")[1]
        console(JWT_SECRET)
        //verify if token is correct or not?
        const verifiedToken = jwt.verify(token, JWT_SECRET)
        console(verifiedToken)

        //extract the userId from verifiedToken and save it in request
        req.body.userId = verifiedToken.userId

        next()

    } catch (error) {
        res.status(401).json({
            success:false,
            message: "Invalid token!, please try logging in again"
        })
    }
}

module.exports = {
    authMiddleware
}