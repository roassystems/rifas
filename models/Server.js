const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const bodyParser = require('body-parser');
const { join } = require('path');
const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`  };
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            beneficiarios: '/api/beneficiarios',
            pagosmoviles: '/api/pagosmoviles',
            documentos: '/api/documentos',
            parametros: '/api/parametros'
        }
        // Conectar a base de datos
        this.conectarDB();
        
        //middlewares
        this.middlewares();
        //rutas de la aplicacion
        this.routes();
        this.app.use(bodyParser.urlencoded(
            { extended: true }
        ))

    }

    async conectarDB() {
        await dbConnection();
    }
    
    middlewares() {
        // CORS
        this.app.use(cors())
        //this.app.use(corsOptions)
        //lectura y parseo del body
        this.app.use(express.json())
        // Directorio Público
        this.app.use(express.static('public'))
      //  this.app.use(express.static(join(__dirname, 'public')));
        this.app.use('/uploads', express.static('./uploads'));


    }
    routes() {
        // this.app.get('/',(req, res)=>{
        //     res.send('Hola mundo node express server');
        // })
        this.app.use(this.paths.auth, require('../routes/authRouter'));
        this.app.use(this.paths.usuarios, require('../routes/usuariosRouter'));
        this.app.use(this.paths.parametros, require('../routes/parametrosRouter'));
        this.app.use(this.paths.beneficiarios, require('../routes/beneficiarioRouter'));
        this.app.use(this.paths.pagosmoviles, require('../routes/pagoMovilRouter'));
        this.app.use(this.paths.documentos, require('../routes/documentosRouter'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}
module.exports = Server;