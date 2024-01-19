const jwt = require("jsonwebtoken");
const  models  = require("../models");

async function authentication(req,res,next){
    const receivedToken = req.headers.authorization
    try{
        if(receivedToken){
            console.log(receivedToken)
            const decodedToken = jwt.verify(receivedToken, "secret_token")
            console.log(decodedToken)
            const user = await models.User.findOne({
                where:{
                    id:decodedToken.tenantId
                }
            })
            console.log('Tenant : ',user)
            if(user){
                req.currentUser=1
                next()
            }
            else{
                res.status(401).json({
                    message: 'Tenant not found'
                })       
            }
        }else {
            res.status(401).json({
                message: 'Token not found'
            })
        }
    }
    catch(error){
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                message: error.message
            })
            return
        }
        next(error) 
    }
}
module.exports = {authentication}