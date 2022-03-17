const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {User, Categorie, Product} = require('../models/')

const coleccionesPermitidas =[
    'users',
    'categories',
    'products',
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

const buscarCategories = async (term, res = response)=>{
        const isMondoId = ObjectId.isValid(term);
        if(isMondoId){
            const categorie = await Categorie.findById(term);
            return res.json({
                result : categorie ? [categorie] : []
            })
        }

        const regex = new RegExp(term, 'i');
        const categories = await Categorie.find({nombre: regex,status:true
          });
        res.json({
            result : categories
        })
}

const buscarProducts = async (term, res = response)=>{
    const isMondoId = ObjectId.isValid(term);
    if(isMondoId){
        const product = await Product.findById(term).populate('categorie', 'nombre');
        return res.json({
            result : product ? [product] : []
        })
    }

    const regex = new RegExp(term, 'i');
    const products = await Product.find({nombre: regex, status:true
    }).populate('categorie', 'nombre');
    res.json({
        result : products
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
        case 'categories':
                buscarCategories(term, res);
            break;
        case 'products':
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