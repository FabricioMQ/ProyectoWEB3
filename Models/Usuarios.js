const {Schema,model}=require('mongoose');

const SchemaUsuario = new Schema({
    Email:{
        type:String,
        unique:true,
        Required:[true,'El campo Email es requerido']
    },
    Password:{
        type:String,
        Required:[true,'El campo Password es requerido']
    },
    Rol:{
        type:String,
        default:'Public'
    },
    Google:{
        type:Boolean,
        default:false,
        Required:[true,'El campo Google es requerido']
    }
})
module.exports=model('Usuario',SchemaUsuario);