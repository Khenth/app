

const Specie = require('./growing_env/specie/species');
const Role = require('./users/role');
const Server = require('./server');
const User = require('./users/user');
const UserGroup = require('./users/usersGroup');
const Variety = require('./growing_env/variety/varieties');
const Farm = require('./growing_env/farm/farms');
const Zone = require('./growing_env/farm/zones');
const Lot = require('./growing_env/farm/lots');
const FarmCropHarvest = require('./farm_crop_harvest/farmcropharvest');
const ChatMensajes = require('./chat-mensajes');


module.exports={
    Specie,
    Role,
    Server,
    User,
    UserGroup,
    Variety,
    Farm,
    Zone,
    Lot,
    FarmCropHarvest,
    ChatMensajes
}