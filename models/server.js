
const express = require('express')
var cors = require('cors');
const { dbConection } = require('../database/config');
const fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/controllers');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server =  require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)
        this.paths = {
            //user
            userPath: '/api/user',
            userGroupPath: '/api/usergroup',
            //auth
            authPath: '/api/auth',
            //Menu
            mainMenuPath: '/api/mainmenu',
            subMenuPath: '/api/submenu',
            subMenuOptionsPath: '/api/submenuoptions',
            //authmenu
            userAuthMenuPath: '/api/menuoptions',
            // cruds
            speciesPath: '/api/species',
            varietiesPath: '/api/varieties',
            farmsPath: '/api/farms',
            zonesPath: '/api/zones',
            lotsPath: '/api/lots',
            // registro de cosecha
            farmCropHarvestPath: '/api/farm/harvest',

            //buscar
            buscarPath: '/api/buscar',
            //Carga de archivos
            uploadsPath: '/api/uploads',

        };
                //conectar base de datos
        this.dbconection();

        //Middlewares
        this.middlewares();
        
        //rutas de mi aplicacion
        this.routes();

        // sockets
        this.sockets();
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

        //Carga de Archivos

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes( ){
       this.app.use(this.paths.authPath, require('../routes/auth'));
       //user
       this.app.use(this.paths.userPath, require('../routes/user'));
       this.app.use(this.paths.userGroupPath, require('../routes/userGroup'));
       //menu
       this.app.use(this.paths.mainMenuPath, require('../routes/mainmenu'));
       this.app.use(this.paths.subMenuPath, require('../routes/submenu'));
       this.app.use(this.paths.subMenuOptionsPath, require('../routes/submenuoptions'));
       //menuauth
       this.app.use(this.paths.userAuthMenuPath, require('../routes/menuoptions'));
       //cruds
       this.app.use(this.paths.speciesPath, require('../routes/species'));
       this.app.use(this.paths.varietiesPath, require('../routes/variety'));
       this.app.use(this.paths.farmsPath, require('../routes/growing_env/farms'));
       this.app.use(this.paths.zonesPath, require('../routes/growing_env/zones'));
       this.app.use(this.paths.lotsPath, require('../routes/growing_env/lots'));
       //registro cosecha
       this.app.use(this.paths.farmCropHarvestPath, require('../routes/farm_crop_harvest/farmcropharvest'));
       //buscar
       this.app.use(this.paths.buscarPath, require('../routes/buscar'));
       //Carga de archivos
       this.app.use(this.paths.uploadsPath, require('../routes/uploads'));
    }

    sockets(){
        this.io.on("connection",(socket)=> socketController(socket, this.io))
    }

    listen(){
        
    this.server.listen(this.port, () => {
    console.log(`App listening on port ${this.port}`)
  })
    }





}


module.exports = Server;