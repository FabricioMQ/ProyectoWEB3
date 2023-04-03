const { request, response } = require('express');
const Expediente = require('../Models/Expedientes');

const GetConsultaMedica = async (req = request, res = response) => {
    try {
        const { Fecha } = req.body;
        const expedientes = await Expediente.find({ "ConsultasMedicas.Fecha": Fecha }, { ConsultasMedicas: { $elemMatch: { Fecha } } });

        const resultados = [];

        expedientes.forEach(expediente => {
            const consulta = expediente.ConsultasMedicas[0];
            resultados.push({ _idExpediente: expediente._id, consulta });
        });

        res.status(200).json({
            ok: 200,
            msg: `Consultas medicas para la fecha ${Fecha}`,
            data: resultados
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo GetConsultaMedica'
        });
    }

}



const PostConsultaMedica = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const {Peso, Altura, Presion, DescripcionSintomas} = req.body;
        const expediente = await Expediente.findById(_id);
        
        if(!expediente){
            return res.status(404).json({
                ok: 404,
                msg: 'No se encontró el expediente',
              });
        }

        expediente.ContactosEmergencias.push({
            Fecha:new Date().toISOString(),
            Peso:Peso, 
            Altura:Altura,
            Presion:Presion, 
            DescripcionSintomas:DescripcionSintomas
        })
        await expediente.save();
        
        res.status(200).json(
            {
                ok: 200,
                "msg": "Registrado correctamente"
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PostConsultaMedica'
        });
    }
}

const PutConsultaMedica = async (req = request, res = response) => {
    try {
        const { _id } = req.params;
        const { Diagnostico,ExamenSangre, ExamenOrina} = req.body;
        await Expediente.findByIdAndUpdate({ _id }, {Diagnostico,ExamenSangre, ExamenOrina});
        res.status(200).json({
            ok: 200,
            msg: 'Consulta Actualizada con exito desde el metodo PutConsultaMedica'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: 500,
            msg: 'Ha ocurrido un error inesperado en el servidor en el metodo PutConsultaMedica'
        });
    }
}


module.exports={
    GetConsultaMedica,
    PostConsultaMedica,
    PutConsultaMedica
}