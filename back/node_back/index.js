const express = require('express');
const app = express();
const { PORT } = require('./config/config');
const http = require('http').createServer(app);
const routes = require('./routes');
require('./config/express')(app);
require("dotenv").config();


// const io = require("socket.io")(http, {
//     cors: {
//         origin: ["http://localhost:3000/"],
//         credentials: true
//     }
// });

// const ChatRoom = require('./models/ChatRoom')

// io.on('connection', async function (socket) {
    
//     // Get chats from mongo collection
//     let asd = await ChatRoom.find().populate("buyer").populate("seller");

//     socket.emit('output', asd);

//     socket.on('input', function(data){
//         console.log(data)
//     });
// });

 // Handle input events
//  io.on('input', async function (data) {
//     console.log(data)

    // let chat = await ChatRoom.findById(chatId);
    // console.log(chat)
    // chat.insert({name: name, message: message}, function(){
    //     io.emit('output', [data]);

    //     // Send status object
    //     sendStatus({
    //         message: 'Message sent',
    //         clear: true
    //     });
    // });

// });



app.use(routes);
http.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}...`));
// app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
