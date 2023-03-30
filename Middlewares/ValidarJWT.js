const { request,response } = require('express');
const Jwt =require('jsonwebtoken');
require('dotenv').config();

const ValidaJWT = (req=request,res=response,next)=>{
    try {
        const token=req.header('auth');
        if(!token){
            return res.status(400).json({
                ok:false,
                msg:'El token no es valido'
            });
        }
        const payload=Jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const {id,rol}=payload;
        req.validate=id;
        req.Rol=rol;
    } catch (err) {
        console.log(err);
        res.status(400).json({
            ok:false,
            msg:'El token no es valido'
        })
    }
    next();
}
module.exports={ValidaJWT}