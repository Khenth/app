const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {User, Specie, Variety} = require('../models/')

const coleccionesPermitidas =[
    'users',
    'species',
    'varieties',
    'rols'
];

const buscarUsers = async(term, res = response)=>{

    const isMondoId = ObjectId.isValid(term);
        
    if(isMondoId) {
        const user = await User.findById(term);
        return res.json({
            result: user? [user] :[]
        });
    }    

        const regex = new RegExp(term, 'i');

        const users = await User.find({
            $or:[{nombre: regex},{correo: regex}],
            $and:[{status:true}]
        })
        res.json({
            result: users
        });
    
}

const buscarSpecies = async (term, res = response)=>{
        const isMondoId = ObjectId.isValid(term);
        if(isMondoId){
            const specie = await Specie.findById(term);
            return res.json({
                result : specie ? [specie] : []
            })
        }

        const regex = new RegExp(term, 'i');
        const species = await Specie.find({nombre: regex,status:true
          });
        res.json({
            result : species
        })
}

const buscarVarieties = async (term, res = response)=>{
    const isMondoId = ObjectId.isValid(term);
    if(isMondoId){
        const variety = await Variety.findById(term).populate('specie', 'nombre');
        return res.json({
            result : variety ? [variety] : []
        })
    }

    const regex = new RegExp(term, 'i');
    const varieties = await Variety.find({nombre: regex, status:true
    }).populate('specie', 'nombre');
    res.json({
        result : varieties
    })
}




const buscar = (req, res = response, )=>{

    
    const {collection, term} = req.params;

               
    if(!coleccionesPermitidas.includes(collection)){
            return res.status(400).json({
                msg: `las colecciones permitidas son: ${coleccionesPermitidas}`
            })
    }

  
    switch (collection) {
        case 'users':
               buscarUsers(term, res);
            break;
        case 'species':
                buscarSpecies(term, res);
            break;
        case 'varieties':
                buscarProducts(term, res)
            break;
    
        default:
            res.status(500).json({
                msg: `esta busqueda no esta generada ${collection, term}`
            })
            
            
         
    }

}


module.exports = {
    buscar
}