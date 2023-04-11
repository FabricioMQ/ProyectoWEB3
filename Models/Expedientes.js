const {Schema,model}=require('mongoose');

const SchemaEnfermedad=new Schema({
    Nombre:{
        type:String,
        unique:true,
        Required:[true,'El campo Nombre es requerido para la enfermedad']
    }
})
const SchemaMedicamentoAlergico=new Schema({
    Nombre:{
        type:String,
        unique:true,
        Required:[true,'El campo Nombre es requerido para el medicamento']
    }
})
const SchemaRegistroExamen=new Schema({
    Hemoglobina:{
        type:Number
    },
    Hematocrito:{
        type:Number
    },
    Trigliceridos:{
        type:Number
    },
    ColesterolTotal:{
        type:Number
    },
    AcidoUridico:{
        type:Number
    },
    Creatinina:{
        type:Number
    },
    Glucosa:{
        type:Number
    },
    Eritrocitos:{
        type:Number
    },
    Color:{
        type:String
    },
    Leucocito:{
        type:Number
    },
})
const SchemaConsultaMedica=new Schema({
    Fecha:{
        type:Date,
        Required:[true,'El campo Fecha es requerido para la consulta medica']
    },
    Especialidad:{
        type:String,
        Required:[true,'El campo Especialidad es requerido para la consulta medica']
    },
    Presion:{
        type:Number,
        Required:[true,'El campo Presion es requerido para la consulta medica']
    },
    Peso:{
        type:Number,
        Required:[true,'El campo Peso es requerido para la consulta medica']
    },
    Altura:{
        type:Number,
        Required:[true,'El campo Altura es requerido para la consulta medica']
    },
    DescripcionSintomas:{
        type:String,
        Required:[true,'El campo DescripcionSintomas es requerido para la consulta medica']
    },
    Diagnostico:{
        type:String,
        Required:[true,'El campo Diagnostico es requerido para la consulta medica']
    },
    ExamenSangre:{
        type:Boolean,
        Required:[true,'El campo examenSangre es requerido para la consulta medica']
    },
    ExamenOrina:{
        type:Boolean,
        Required:[true,'El campo examenOrina es requerido para la consulta medica']
    },
    RegistrosExamenes:{
        type: SchemaRegistroExamen,
        default: {}
    },
})
const SchemaContactoEmergencia=new Schema({
    Nombre:{
        type:String,
        Required:[true,'El campo Nombre es requerido para el contacto de emergencia']
    },
    Apellido:{
        type:String,
        Required:[true,'El campo Apellido es requerido para el contacto de emergencia']
    },
    Relacion:{
        type:String,
        Required:[true,'El campo Relacion es requerido para el contacto de emergencia']
    },
    Telefono:{
        type:String,
        Required:[true,'El campo Telefono es requerido para el contacto de emergencia']
    },    
    Direccion:{
        type:String,
        Required:[true,'El campo Direccion es requerido para el contacto de emergencia']
    }
})

const SchemaExpediente = new Schema({

Identificacion:{
    type:String,
    unique:true,
    Required:[true,'El campo Identificacion es requerido']
},
Nombre:{
    type:String,
    Required:[true,'El campo Nombre es requerido']
},
Apellido:{
    type:String,
    Required:[true,'El campo Apellido es requerido']
},
Telefono:{
    type:String,
    Required:[true,'El campo Telefono es requerido']
},
Direccion:{
    type:String,
    Required:[true,'El campo Direccion es requerido']
},
Peso:{
    type:Number,
    Required:[true,'El campo Peso es requerido']
},
Edad:{
    type:Number,
    integer:true,
    Required:[true,'El campo Edad es requerido']
},
Altura:{
    type:Number,
    Required:[true,'El campo Altura es requerido']
},
Enfermedades:[
    SchemaEnfermedad
],
TipoSangre:{
    type:String,
    required:[true,'El campo TipoSangre es requerido']
},
MedicamentoAlergicos:[
     SchemaMedicamentoAlergico
],
ContactosEmergencias:[
    SchemaContactoEmergencia,
  {  required:[true,'El campo contacto de emergencia es requerido , minimo 1 contacto']}
],
ConsultasMedicas:[
    SchemaConsultaMedica
]

})
module.exports=model('Expediente',SchemaExpediente);