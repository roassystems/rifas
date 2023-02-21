const { response, request } = require("express");
//const bcryptjs = require("bcryptjs");
const PagoMovilUsuario = require('../models/pagomovil');

const getDetallePagoMovil = async(req, resp=response)=>{
    const { id } = req.params;
    const pagom = await PagoMovilUsuario.findById(id);
    if(pagom){
      resp.json({
        msg: 'El detalle del pago movil es:',
        pagom
       });
    }else{
      resp.status(404).json({
        msg:'pago movil no encontrado:',
        pagom
      })
    }
    
  }

  const getPagosMovilesLimiteDesde = async(req, res = response) => {
    const { limite = 50, desde = 0 } = req.query;
    const query = { estado_activo: true };
    const [ total, listapagomovil ] = await Promise.all([
          PagoMovilUsuario.countDocuments(query),
          PagoMovilUsuario.find(query)
              .skip( Number( desde ) )
              .limit(Number( limite ))
              .sort({
                cedula_pago: 1,
               
              })
      ]);
  
      res.json({
          total,
          listapagomovil
      });
    
  };

  const registrarPagoMovil = async(req, resp=response)=>{
    const {
        uid_usuario,
        cedula_pago,
        telefono,
        banco,
        estado_activo,
       
    } = req.body;
    const pagom = new PagoMovilUsuario({
        uid_usuario,
        cedula_pago,
        telefono,
        banco,
        estado_activo,
    });

    const existeCedula = await PagoMovilUsuario.findOne({ cedula_pago });
    if(!existeCedula){
        // Guardar en BD
      await pagom.save();
      resp.json({
        msg: "Pago movil guardado exitosamente",
        pagom,
      });
    } else{
      const id = existeCedula._id;
      existeCedula.banco = pagom.banco;
      existeCedula.uid_usuario = pagom.uid_usuario;
      existeCedula.cedula_pago = pagom.cedula_pago;
      existeCedula.telefono = pagom.telefono;
      const { _id, estado_activo, ...resto } = existeCedula;
      const pagomupd = await PagoMovilUsuario.findByIdAndUpdate(id, resto);
        resp.json({
          msg: `Pago movil de usuario: ${existeCedula._id} actualizado en Put Controller`,
          pagomupd ,
        });
    }
      
  }

const actualizarPagoMovilPut = async (req, res = response) => {
    const { id } = req.params;
    //la siguiente linea me extrae del objeto lo que no quiero modificar y resto tiene las propiedades que se pueden modificar
    const { _id,uid_usuario, ...resto } = req.body;
    const pagom = await PagoMovilUsuario.findByIdAndUpdate(id, resto);
    res.json({
      msg: "Pago movil actualizado en Put Controller",
      pagom,
    });
  };

  const pagoMovilDelete = async(req, res = response) => {
    const { id } = req.params;
    //console.log("id del usuario a desactivar "+id);
    const pagom = await PagoMovilUsuario.findByIdAndUpdate( id, { estado_activo: false } );
    res.json({
      msg: "Pago movil eliminado logicamente Controller",
      pagom,
    });
  }
  module.exports={
    getDetallePagoMovil,
    getPagosMovilesLimiteDesde,
    registrarPagoMovil,
    actualizarPagoMovilPut,
    pagoMovilDelete

  }