const jwt = require("jsonwebtoken");
const userdb = require("../model/userSchema")
const verifyToken = async (req, res, next)=>{
    // try {
    //     const mytoken = req.header("x-auth-token")
    //     if(!mytoken){
    //         return res.status(401).send("No authentication token, Access-Deniend")
    //     }
    //     const verified = jwt.verify(mytoken, process.env.SECRET_KEY, (err, decoded)=>{
    //         if(err){
    //             return res.status(400).json({msg:"Your Invalid token"})
    //         }
    //         req.user = decoded.user
    //         next()
    //     })
    // } catch (error) {
    //     res.status(400).send("Invalid Token")
    // }
    try {
        const token = req.headers.authorization;
        if(!token){
            res.status(422).json({err:"No authentication token, Access-Deniend"})
        }
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        if(!verify){
            res.status(422).json({msg:"Invalid User"})      
        }
        const rootUser = await userdb.findOne({_id:verify._id})
        if(!rootUser){
            res.status(422).json({msg:"Cannot find User"})
        }
        //console.log(rootUser)
        req.token = token
        req.rootUser = rootUser
        req.userId= rootUser._id
        next()
    } catch (error) {
        res.status(401).json({status:401, msg:"Unauthorized no token provided"})
    }
}

module.exports = verifyToken;