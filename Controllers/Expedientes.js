const {request, response}=require('express');
const Expediente = require('../Models/Expedientes');

const PostExpediente = async (req = request, res = response) => {
    try {

        const {Identificacion, Nombre, Apellido, Telefono, Direccion, Peso, Edad, Altura, Enfermedades, TipoSangre, MedicamentosAlergicos, ContactosEmergencias} = req.body;
        const expediente = new Expediente({Identificacion, Nombre, Apellido, Telefono, Direccion, Peso, Edad, Altura, Enfermedades, TipoSangre, MedicamentosAlergicos, ContactosEmergencias});

        await expediente.save();
        res.status(200).json(
            {
                ok: 200,
                msg: 'Expediente registrado con exito'
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PostExpediente'
        });
    }

}

const GetExpediente = async (req = request, res = response) => {
    try {
        const expedientes = await Expediente.find({},'_id Nombre Apellido Telefono Direccion TipoSangre Peso Edad Altura');
        res.status(200).json({
            ok: 200,
            msg: 'Listado de todos los expedientes',
            data: expedientes
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo GetExpediente'
        });
    }
}
const GetExpedienteOne = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const expediente = await Expediente.findById(_id);
        res.status(200).json({
            ok: 200,
            msg: 'Informacion personal del expediente',
            data: expediente
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo GetExpedienteOne'
        });
    }
}
const DeleteExpediente = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        await Expediente.findByIdAndDelete({ _id });
        res.status(200).json({
            ok: 200,
            msg: 'Expediente eliminado con exito'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo DeleteExpediente'
        });
    }
}
const PutExpediente = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const { Nombre, Apellido, Telefono, Direccion, Peso, Edad, Altura, TipoSangre} = req.body;
        await Expediente.findByIdAndUpdate({ _id }, {Nombre, Apellido, Telefono, Direccion, Peso, Edad, Altura, TipoSangre});
        res.status(200).json({
            ok: 200,
            msg: 'Expediente Actualizado con exito'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PutExpediente'
        });
    }
}
const PostMedicamentoAlergico = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const {Nombre} = req.body;
        const expediente = await Expediente.findById(_id);
        
        if(!expediente){
            return res.status(404).json({
                ok: 404,
                msg: 'No se encontró el expediente',
              });
        }

        expediente.MedicamentosAlergicos.push({Nombre})
        await expediente.save();
        
        res.status(200).json(
            {
                ok: 200,
                "msg": "Medicamento registrado con exito"
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PostMedicamentoAlergico'
        });
    }

}
const DeleteMedicamentoAlergico = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const {_idMedicamento} = req.body;
        const expediente = await Expediente.findById(_id);
        
        if(!expediente){
            return res.status(404).json({
                ok: 404,
                msg: 'No se encontró el expediente',
              });
        }

        const medicamento = expediente.MedicamentosAlergicos.find((m) => m._id.toString() === _idMedicamento);

        if (!medicamento) {
            return res.status(404).json({
              ok: 404,
              msg: 'No se encontró el medicamento alérgico',
            });
          }
        
          expediente.MedicamentosAlergicos.pull(medicamento);

        await expediente.save();
          
        res.status(200).json(
            {
                ok: 200,
                "msg": "Medicamento eliminado con exito"
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo DeleteMedicamentoAlergico'
        });
    }

}
const PostEnfermedad = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const {Nombre} = req.body;
        const expediente = await Expediente.findById(_id);
        
        if(!expediente){
            return res.status(404).json({
                ok: 404,
                msg: 'No se encontró el expediente',
              });
        }

        expediente.Enfermedades.push({Nombre})
        await expediente.save();
        
        res.status(200).json(
            {
                ok: 200,
                "msg": "Enfermedad registrada con exito"
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PostEnfermedad'
        });
    }
}

const DeleteEnfermedad = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const {_idEnfermedad} = req.body;
        const expediente = await Expediente.findById(_id);
        
        if(!expediente){
            return res.status(404).json({
                ok: 404,
                msg: 'No se encontró el expediente',
              });
        }

        const enfermedad = expediente.Enfermedades.find((m) => m._id.toString() === _idEnfermedad);
        
        if (!enfermedad) {
            return res.status(404).json({
              ok: 404,
              msg: 'No se encontró la enfermedad',
            });
          }
        
          expediente.Enfermedades.pull(enfermedad);

        await expediente.save();
          
        res.status(200).json(
            {
                ok: 200,
                "msg": "Enfermedad eliminada con exito"
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo DeleteEnfermedad'
        });
    }

}
const PostContactoEmergencia = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const {Nombre,Apellido,Relacion,Telefono,Direccion} = req.body;
        const expediente = await Expediente.findById(_id);
        
        if(!expediente){
            return res.status(404).json({
                ok: 404,
                msg: 'No se encontró el expediente',
              });
        }

        expediente.ContactosEmergencias.push({
            Nombre:Nombre,
            Apellido:Apellido,
            Relacion:Relacion,
            Telefono:Telefono,
            Direccion:Direccion
        })
        await expediente.save();
        
        res.status(200).json(
            {
                ok: 200,
                "msg": "Contacto registrado con exito"
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PostContactoEmergencia'
        });
    }
}

const DeleteContactoEmergencia = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const {_idContacto} = req.body;
        const expediente = await Expediente.findById(_id);
        
        if(!expediente){
            return res.status(404).json({
                ok: 404,
                msg: 'No se encontró el expediente',
              });
        }

        const contacto = expediente.ContactosEmergencias.find((m) => m._id.toString() === _idContacto);
        
        if (!contacto) {
            return res.status(404).json({
              ok: 404,
              msg: 'No se encontró el contacto de emergencia',
            });
          }
        
          expediente.ContactosEmergencias.pull(contacto);

        await expediente.save();
          
        res.status(200).json(
            {
                ok: 200,
                "msg": "Contacto de emergencia eliminado con exito"
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo DeleteContactoEmergencia'
        });
    }

}
module.exports={
    PutExpediente,
    DeleteExpediente,
    GetExpediente,
    PostExpediente,
    GetExpedienteOne,
    PostEnfermedad,
    DeleteEnfermedad,
    PostMedicamentoAlergico,
    DeleteMedicamentoAlergico,
    PostContactoEmergencia,
    DeleteContactoEmergencia
}