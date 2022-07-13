const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const {ChatMensajes} = require("../models");

const chatMensajes = new ChatMensajes()

const socketController = async(socket = new Socket(), io) => {
    const user =  await comprobarJWT(socket.handshake.headers['x-token']);
    if(!user){
        return socket.disconnect();
    }

    // agregar usuario conectado
    chatMensajes.conectarUsuario(user)
    io.emit('usuarios-activos', chatMensajes.usuariosArr);

    //conectar a una sala especial

    socket.join(user.id);
    
    //limpiar al desconectarse usuario
    socket.on('disconnect', ()=>{
        chatMensajes.desconectarUsuario(user.id)
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    })
    
    //enviar mensaje
    socket.on('enviar-mensaje', ({uid, mensaje})=>{
        if(uid){
            //mensaje privado
            socket.to(uid).emit('mensaje-privado', {de: user.nombre, mensaje})

        }else{

            chatMensajes.enviarMensaje(user.uid, user.nombre, mensaje)
            io.emit('recibir-mensajes', chatMensajes.ultimos10);

        }

    })
    



}

module.exports = {
    socketController
}