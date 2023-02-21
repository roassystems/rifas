const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Parametro = require('../models/parametros');

const getParametrosRifas = async(req, res = response) => {
   //const query = { estadoActivo: true };
    const [ total, parametros ] = await Promise.all([
         Parametro.countDocuments(),
         Parametro.find()
         
     ]);
 
     res.json({
         total,
         parametros
     });
   
 };

 const registroYActualizacionPost = async (req, res = response) => {
    const {servicio_activo,sorteos_activos,costo_sorteo_tipo_a,
        costo_sorteo_tipo_b,
        porcentaje_comision_bancos,cantidad_sorteo_resp,url_log
    } = req.body;

    
   
    const [ total] = await Promise.all([
        Parametro.countDocuments(),
            
    ]);
    if (total === 0) {
      // Guardar en BD
      const parametro = new Parametro({
        servicio_activo,sorteos_activos,costo_sorteo_tipo_a,
        costo_sorteo_tipo_b,
        porcentaje_comision_bancos,cantidad_sorteo_resp,url_log
      });
      await parametro.save();
      res.json({
        msg: "Parametro guardado exitosamente",
        parametro,
      });
    } else {
      const elpara = await Parametro.findOne();
      elpara.servicio_activo = servicio_activo;
      elpara.sorteos_activos = sorteos_activos;
      elpara.costo_sorteo_tipo_a = costo_sorteo_tipo_a;
      elpara.costo_sorteo_tipo_b = costo_sorteo_tipo_b;
      elpara.porcentaje_comision_bancos = porcentaje_comision_bancos;
      elpara.cantidad_sorteo_resp = cantidad_sorteo_resp;
      const { url_logo, ...resto } = elpara;  
      //console.log("id de unico registro de parametro "+elpara.id)
      const paraactualizado = await Parametro.findByIdAndUpdate(elpara.id, resto);
      res.json({
        msg: "Parametro actualizado exitosamente",
        paraactualizado,
      });
    }
    
  };
 module.exports={getParametrosRifas, registroYActualizacionPost}
