// Para rodar o projeto no terminal: npm run dev

const express = require( 'express' );
const path = require('path')


const app = express();
const http = require( 'http' ).createServer( app );

app.use(express.static(path.join(__dirname, 'public')))

const io = require( 'socket.io' )( http )
io.on( 'connection', socket => {
    console.log( 'conectado' );
    
    socket.on( 'enviarMensagem', msg => {
        // console.log(msg);
        socket.broadcast.emit('enviarParaTodos', msg)
    })
})

const PORT = process.env.PORT || 3000
http.listen( PORT, () => {
    console.log('server está rodando na porta', PORT);
})
