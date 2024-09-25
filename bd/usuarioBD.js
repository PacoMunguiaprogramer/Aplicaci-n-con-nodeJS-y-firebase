const usuariosBD = require("./conexion").usuarios;


const Usuario = require("../modelos/UsuarioModelo");
const {encryptPass, validarPass,usuarioAuto,adminAuto}=require("../middlewares/funcionesPass");
function validarDatos(usuario){
    var valido=false;
    if(usuario.nombre!=undefined && usuario.usuario!=undefined && usuario.password!=undefined){
        valido=true;
    }
    return valido;
}

async function mostrarUsuarios(){
    const usuarios = await usuariosBD.get();
    //console.log(usuarios);
    usuariosValidos=[];
    usuarios.forEach(usuario => {
        const usuario1=new Usuario({id:usuario.id, ...usuario.data()});
        if(validarDatos(usuario1.getUsuario)){
            usuariosValidos.push(usuario1.getUsuario);
        }
    });
    //console.log(usuariosValidos);
    return usuariosValidos;
}

async function buscarPorId(id){
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id, ...usuario.data()});
    var usuarioValido;
    if (validarDatos(usuario1.getUsuario)){
        usuarioValido=usuario1.getUsuario;
    }
    //console.log(usuarioValido);
    return usuarioValido;
}

async function newUser(data) {
    const {salt,hash}=encryptPass(data.password);
    data.password=hash;
    data.salt=salt;
data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);
    //console.log(usuario1.getUsuario);
    var usuarioValido=false;
    if (validarDatos(usuario1.getUsuario)){
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido=true;
    }
    return usuarioValido;
}

async function eliminarUsuario(id) {
    var usuarioValido=await buscarPorId(id);
    var usuarioBorrado=false;
    if(usuarioValido){

    
        await usuariosBD.doc(id).delete();
    usuarioBorrado=true;
}
return usuarioBorrado;
}

module.exports={
    mostrarUsuarios,
    buscarPorId,
    eliminarUsuario,
    newUser
}

//Revisar cuando si existe el usuario, pero el usuario es incorrecto
//deleteUser("100");

/*data={
    nombre:"Juana Martinez",
    usuario:"abc",
    password:"abc"
}

async function prueba() {
    console.log(await newUser(data));
}

prueba();*/
//busXId("300");
//mostrarUsuarios();