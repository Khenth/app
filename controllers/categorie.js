const { response, request } = require("express");
const {Categorie} = require('../models/')

// OBTENER CATEGORIAS PAGINADO - TOTAL -  POPULATE

const obtenerCategories = async (req = request, res = response)=>{

    const {limit = 5, init = 0} = req.query;
    const querySt = {status : true};

    const [categories, totalCategories] = await Promise.all([

            Categorie.find(querySt)
            .populate('user', 'nombre')
            .skip(Number(init))
            .limit(Number(limit)),
            Categorie.countDocuments(querySt)]
    )

    res.status(200).json({
        totalCategories,
        categories
    })

}

// OBTENER SOLO UNA CATEGORIA CON POPULATE

const ObtenerCategorie = async (req, res)=>{

        const {id} = req.params;
        const categorie = await Categorie.findById(id).populate('user','nombre')

       res.status(200).json({
          categorie
       })


}



const crearCategoria = async (req, res = response)=>{

        const nombre = req.body.nombre.toUpperCase();

        const categoriaDB = await Categorie.findOne({nombre});

        if(categoriaDB){
           return res.status(400).json({
                msg: `la categoria ${categoriaDB.nombre} ya existe`
            });
        }

        //generar la informacion para el modelo
        const data = {
            nombre,
            user: req.user._id
        }

        const categorie = new Categorie(data);

        // guardar

        await categorie.save();

        res.status(200).json(categorie);

}

// ACTUALIZAR CATEGORIA

const actualizarCategorie = async(req, res = response)=>{

        const {id} = req.params;
        const{status, user, ...data} = req.body;

        data.nombre = data.nombre.toUpperCase();
        data.user = req.user._id;
        
        const actualizaCategorie = await Categorie.findByIdAndUpdate(id, data,{new:true});

        res.status(200).json(actualizaCategorie);

}

// BORRAR CATEGORIA - ESTADO A FALSE

const deleteCategorie = async (req, res=response)=>{
    const {id} = req.params;
  
    const deleteCategorie = await Categorie.findByIdAndUpdate(id, {status:false},{new: true});

    res.status(200).json(deleteCategorie);

}

module.exports ={
    crearCategoria,
    obtenerCategories,
    ObtenerCategorie,
    actualizarCategorie,
    deleteCategorie
}