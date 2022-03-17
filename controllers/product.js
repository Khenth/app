const { response, request } = require("express");
const { Product } = require("../models");



const obtenerProducts = async (req = request,res=response)=>{

    const {init=0, limit=5}= req.query;
    const querySt = {status: true};

    const [totalProducts, products] = await Promise.all([
        Product.countDocuments(querySt),
        Product.find(querySt)
        .populate('user','nombre')
        .populate('categorie','nombre')
        .skip(init)
        .limit(limit)
    ])

    res.json({
        totalProducts,
        products
    })

}

const obtenerProduct = async (req, res=response)=>{

   const {id} = req.params;

   const productExiste = await Product.findById(id)
                                .populate('user','nombre')
                                .populate('categorie','nombre');

   res.json(productExiste);

}


const crearProducto = async (req =request, res = response)=>{

    const {id,status,...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.color = data.color.toUpperCase();
    data.largo = data.largo.toUpperCase();
    data.user = req.user._id;

    const nombre = data.nombre
   
      productsDB = await Product.findOne({nombre});

    if(productsDB){
        return res.status(400).json({
            msg: `El producto ${productsDB.nombre} ya existe`
        });
    }

    const product = new Product(data);

    await product.save();

    res.status(200).json(product);
}

const actualizarProduct = async (req, res = response)=>{
    const {id}= req.params;
    const {status,...data}= req.body;

    data.nombre = data.nombre.toUpperCase();
    data.color = data.color.toUpperCase();
    data.largo = data.largo.toUpperCase();
    data.user = req.user._id;

    const actualizaProduct = await Product.findByIdAndUpdate(id,data,{new: true})

    res.status(200).json(actualizaProduct);


}

const deleteProduct = async (req, res = response)=>{

    const {id} = req.params;

    const deleteProcduct = await Product.findByIdAndUpdate(id,{status:false}, {new:true});

    res.json(deleteProcduct);


}


module.exports = {
    obtenerProducts,
    obtenerProduct,
    crearProducto,
    actualizarProduct,
    deleteProduct
}