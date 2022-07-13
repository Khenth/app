const Auth = require('./auth/auth');
const User = require('./user/user');
const UserGroup = require('./user/userGroup');
const MainMenu = require('./menu/mainmenu/mainmenu');
const SubMenu = require('./menu/menu/submenu');
const SubMenuOption = require('./menu/submenu/submenuoptions');
const Specie = require('./growing_env/specie/specie');
const Variety = require('./growing_env/variety/variety');
const Farm = require('./growing_env/farm/farms');
const Zone = require('./growing_env/farm/zones');
const Lot = require('./growing_env/farm/lots');
const FarmCropHarvest = require('./farm_crop_harvest/farmcropharvest');
const Search = require('./search/buscar');
const Upload = require('./uploads/uploads');



module.exports = {
    ...Auth,
    ...User,
    ...UserGroup,
    ...MainMenu,
    ...SubMenu,
    ...SubMenuOption,
    ...Specie,
    ...Variety,
    ...Farm,
    ...Zone,
    ...Lot, 
    ...FarmCropHarvest,
    ...Search,
    ...Upload
}