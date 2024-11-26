import express from 'express'; 
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'

const app = express();
const server = http.createServer(app);
app.use(cors())

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // React's default dev server
        methods: ['GET', 'POST']
    }
});

const PORT = 3000;

app.get('/hello', (req, res)=>{
    res.send('<h1>Hello world</h1>')
})

let poll = {
    question: "What's your favorite color?",
    options: ["Red", "Green"],
    votes: [0, 0]  // Tracks votes for each option
};

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for a vote from the client
    socket.on('vote', (index) => {
      poll.votes[index]++; // Increment vote for the selected option
      io.emit('pollData', poll); // Broadcast updated poll data to all clients
    });

    // Listen for new poll creation from the client
    socket.on('createPoll', (newPoll) => {
        // Update the poll with the new data
        poll = newPoll; // Replace the old poll with the new one
        io.emit('pollData', poll); // Broadcast the updated poll to all clients
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})

server.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})