const jwt =require('jsonwebtoken');
require('dotenv').config();


const GenerarJWT=async(id='',rol='')=>{
    const options={
        expiresIn: '3h' 
    }
    return new Promise((resolve,reject)=>{
        const payload={id,rol};
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,options,(err,token)=>{
                if(err){
                    reject('No se pudo generar el token')
                }else{
                    resolve(token)
                }
            }
        )

    })
}

module.exports=GenerarJWT
