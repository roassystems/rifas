const {request,response} = require('express');
const Beneficiario = require('../models/beneficiarios');
const Documentos = require('../models/documentos');
const getBeneficiariosActivosLimiteDesde = async(req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado_activo: true };
    const [ total, beneficiarios ] = await Promise.all([
          Beneficiario.countDocuments(query),
          Beneficiario.find(query)
              .skip( Number( desde ) )
              .limit(Number( limite ))
              .sort({
                nombre: 1,
                apellido: -1,
              })
      ]);
  
      res.json({
          total,
          beneficiarios
      });
    
  };
  
  const getBeneficiariosTodosActivos = async(req, res = response) => {
     const query = { estado_activo: true };
     const [ total, beneficiarios ] = await Promise.all([
          Beneficiario.countDocuments(query),
          Beneficiario.find(query)
          .sort({
            nombre: 1,
            apellido: -1,
          })
      ]);
  
      res.json({
          total,
          beneficiarios
      });
    
  };

  const getBeneficiariosTodosInactivos = async(req, res = response) => {
    const query = { estado_activo: true };
    const [ total, beneficiarios ] = await Promise.all([
         Beneficiario.countDocuments(query),
         Beneficiario.find(query)
         .sort({
           nombre: 1,
           apellido: -1,
         })
     ]);
 
     res.json({
         total,
         beneficiarios
     });
   
 };

  const registrarBeneficiario = async(req, resp=response)=>{
    const {
        uid_responsable,
        nombre,
        apellido,
        cedula,
        img_beneficiario,
        estado_activo,
        fecha_registro,
    } = req.body;
      const beneficiario = new Beneficiario({
        uid_responsable,
        nombre,
        apellido,
        cedula,
        img_beneficiario,
        estado_activo,
        fecha_registro,
      });
      // Guardar en BD
      await beneficiario.save();
      resp.json({
        msg: "Beneficiario guardado exitosamente",
        beneficiario,
      });
  }

const actualizarBeneficiarioPut = async (req, res = response) => {
    const { id } = req.params;
    
    //la siguiente linea me extrae del objeto lo que no quiero modificar y resto tiene las propiedades que se pueden modificar
    const { _id,fecha_registro,img_beneficiario, ...resto } = req.body;
    const cedula = resto.cedula;
    console.log("cedula a actualizar "+resto.cedula);
    const existeCedula = await Beneficiario.findOne({ cedula });
  
    if ( existeCedula ) {
      console.log("id de usuario registrado con cedula "+existeCedula.id);
       if(existeCedula.id===id){
        const beneficiario = await Beneficiario.findByIdAndUpdate(id, resto);
        res.json({
          msg: "Beneficiario actualizado en Put Controller",
          beneficiario,
        });
       } else{
         res.status(400).json({
            msg: "Cedula ya esta registrada con otro usuario",
          
        });
       }
    } else {
      const beneficiario = await Beneficiario.findByIdAndUpdate(id, resto);
        res.json({
          msg: "Beneficiario actualizado en Put Controller",
          beneficiario,
        });
    }
   
  };

  const actualizarImgBeneficiarioPut = async (req, res = response) => {
    const { id } = req.params;
    //la siguiente linea me extrae del objeto lo que no quiero modificar y resto tiene las propiedades que se pueden modificar
    const { _id,fecha_registro, ...resto } = req.body;
    const beneficiario = await Beneficiario.findByIdAndUpdate(id, resto);
    res.json({
      msg: "Imagen de Beneficiario actualizado en Put Controller",
      beneficiario,
    });
  };

  const beneficiarioDelete = async(req, res = response) => {
    const { id } = req.params;
    //console.log("id del usuario a desactivar "+id);
    const beneficiario = await Beneficiario.findByIdAndUpdate( id, { estado_activo: false } );
    res.json({
      msg: "Beneficiario eliminado logicamente Controller",
      beneficiario,
    });
  }

  const borrarBeneficiarioFisicamente = async(req, res = response) => {
    const { id } = req.params;
    //console.log("id del usuario a desactivar "+id);
    const encontrado = await Beneficiario.findById(id);
    const doc = await Documentos.findOneAndRemove(encontrado.uid_beneficiario);
    const beneficiario = await Beneficiario.findByIdAndUpdate( id, { estado_activo: false } );
    res.json({
      msg: "Beneficiario eliminado logicamente Controller",
      beneficiario,
    });
  }

  const getDetalleBeneficiario = async(req, resp=response)=>{
    const { id } = req.params;

    const beneficiario = await Beneficiario.findById(id);
    if(beneficiario){
      resp.status(200).json({
        msg:'El detalle del beneficiario es:',
        beneficiario
    });
    }else{
      resp.status(404).json({
        msg:'beneficiario no encontrado:',
        beneficiario
      })
    }
    
  }
  module.exports = {
    getBeneficiariosActivosLimiteDesde,
    getBeneficiariosTodosActivos,
    getBeneficiariosTodosInactivos,
    registrarBeneficiario, 
    actualizarBeneficiarioPut,
    actualizarImgBeneficiarioPut,
    beneficiarioDelete,
    getDetalleBeneficiario,
    borrarBeneficiarioFisicamente
  }