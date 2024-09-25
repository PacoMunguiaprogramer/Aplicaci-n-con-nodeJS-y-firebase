/*const admin = require("firebase-admin");
const keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

const proyecto=admin.firestore();
const usuarios=proyecto.collection("miejemploBD");
const productos=proyecto.collection("productos");

/*productos.get().then(snapshot => {
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    });
}).catch(error => {
    console.log('Error al obtener productos:', error);
});*/
module.exports={
    usuarios,
    productos
}