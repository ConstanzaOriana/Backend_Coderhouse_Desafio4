const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer);
const handlebars = require('express-handlebars');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', 'views');
app.set('view engine', 'handlebars');

let dataProducts = [];

app.get('/', (req, res) => {
    res.render('home', { data: dataProducts });
});

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
});

io.on('connection', socket => {

    console.log('a user connected');

    socket.emit('viewProducts', dataProducts);

    socket.on('addProduct', product => {
        dataProducts.push(product);
        io.sockets.emit('viewProducts', dataProducts);
    });

    socket.on('removeProduct', product => {
        dataProducts = dataProducts.filter(element => element != product) || null;
        io.sockets.emit('viewProducts', dataProducts);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
});

httpServer.listen(8080, () => console.log("Server running on port 8080"));