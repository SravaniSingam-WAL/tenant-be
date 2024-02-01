const jwt = require("jsonwebtoken");
const  models  = require("../models");

async function authentication(req,res,next){
    const receivedToken = req.headers.authorization
    try{
        console.log('Authorization started')
        if(receivedToken){
            const decodedToken = jwt.verify(receivedToken, "secret_token")
            const user = await models.User.findOne({
                where:{
                    id:decodedToken.tenantId
                }
            })
            if(user){
                req.currentUser=1
                console.log('Authorization is done')
                next()
            }
            else{
                console.log('Authorization started')

                res.status(401).json({
                    message: 'Tenant not found 1'
                })       
            }
        }else {
            res.status(401).json({
                message: 'Token not found 443'
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