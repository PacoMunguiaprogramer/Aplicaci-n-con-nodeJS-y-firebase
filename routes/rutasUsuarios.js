var rutas=require("express").Router();
//var {Router}= require("express");
var {mostrarUsuarios,buscarPorId,eliminarUsuario,newUser}= require("../bd/usuarioBD");
var { mostrarProductos, buscarPorIdProducto, eliminarProducto, newProduct } = require("../bd/productoBD");

rutas.get("/", async (req, res)=>{
    //res.send("Hola estas en raíz");
   var usuariosValidos= await mostrarUsuarios();
   // console.log(usuariosValidos);
    res.json(usuariosValidos);
});

rutas.get("/buscarPorId/:id",async(req,res)=>{
    var usuarioValido=await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

rutas.delete("/borrarUsuario/:id",async(req,res)=>{
var usuarioBorrado=await eliminarUsuario(req.params.id);
res.json(usuarioBorrado);
});

rutas.post("/nuevoUsuario",async(req,res)=>{
var usuarioValido=await newUser(req.body);
res.json(usuarioValido);
});



// Ruta para mostrar todos los productos
rutas.get("/productos", async (req, res) => {
    var productosValidos = await mostrarProductos();
    res.json(productosValidos);
});

// Ruta para buscar un producto por ID
rutas.get("/buscarPorIdProducto/:id", async (req, res) => {
    var productoValido = await buscarPorIdProducto(req.params.id);
    res.json(productoValido);
});

// Ruta para eliminar un producto por ID
rutas.delete("/borrarProducto/:id", async (req, res) => {
    var productoBorrado = await eliminarProducto(req.params.id);
    res.json(productoBorrado);
});

// Ruta para crear un nuevo producto
rutas.post("/nuevoProducto", async (req, res) => {
    var productoValido = await newProduct(req.body);
    res.json(productoValido);
});
module.exports=rutas;