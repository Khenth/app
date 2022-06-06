

const Specie = require('./species');
const Role = require('./role');
const Server = require('./server');
const User = require('./user');
const Variety = require('./varieties');
const Farm = require('./growing_env/farms');
const Zone = require('./growing_env/zones');
const Lot = require('./growing_env/lots');
const FarmCropHarvest = require('./farm_crop_harvest/farmcropharvest');
const ChatMensajes = require('./chat-mensajes');


module.exports={
    Specie,
    Role,
    Server,
    User,
    Variety,
    Farm,
    Zone,
    Lot,
    FarmCropHarvest,
    ChatMensajes
}