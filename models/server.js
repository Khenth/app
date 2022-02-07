
const express = require('express')
var cors = require('cors')


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user'
        //Middlewares
        this.middlewares();
        
        //rutas de mi aplicacion
        this.routes();
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
       this.app.use(this.userPath, require('../routes/user'));
    }


    listen(){
        
    this.app.listen(this.port, () => {
    console.log(`Example app listening on port ${this.port}`)
  })
    }





}


module.exports = Server;