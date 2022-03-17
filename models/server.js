
const express = require('express')
var cors = require('cors');
const { dbConection } = require('../database/config');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            userPath: '/api/user',
            authPath: '/api/auth',
            categoriesPath: '/api/categories',
            productsPath: '/api/products',
            buscarPath: '/api/buscar',

        };
                //conectar base de datos
        this.dbconection();

        //Middlewares
        this.middlewares();
        
        //rutas de mi aplicacion
        this.routes();
    }

    async dbconection(){
        await dbConection()
    }



    middlewares(){

        //CORS

        this.app.use(cors());

        //lectura y parceo del body

        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes( ){
       this.app.use(this.paths.authPath, require('../routes/auth'));
       this.app.use(this.paths.categoriesPath, require('../routes/categories'));
       this.app.use(this.paths.userPath, require('../routes/user'));
       this.app.use(this.paths.productsPath, require('../routes/product'));
       this.app.use(this.paths.buscarPath, require('../routes/buscar'));
    }


    listen(){
        
    this.app.listen(this.port, () => {
    console.log(`Example app listening on port ${this.port}`)
  })
    }





}


module.exports = Server;