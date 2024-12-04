const express = require('express');
const connectionDB = require('./config/dbConnction');
const cors = require('cors');
const { Server } = require('socket.io');
const router = require('./router/route');
const cookieParser = require('cookie-parser');
const http = require('http');
const Chat = require('./model/chatModel');
require('dotenv').config();
const chatRoute = require('./router/chatRoute');
const { saveMessage } = require('./controller/chatController');
const { log } = require('util');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  },
});

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true,
};


io.on("connection",(socket)=>{
  
  socket.on("create-room",(userId)=>{
     socket.join(userId)
     
  })

  socket.on("message", async (data) => {
    const {sender,message,receiver} = data
    console.log(sender,message,receiver);
    
  
    if (!data || !data.message) {
        console.error("Invalid data format. Expected { message: <string> }");
        return;
    }
    socket.emit("message",message)
    io.to(receiver).emit("message", message);
    await saveMessage(data);
});



  socket.on("disconnect", ()=>{
    console.log("user disconnetd:" ,socket.id)
  })
})

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);
app.use(chatRoute)

connectionDB();

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
