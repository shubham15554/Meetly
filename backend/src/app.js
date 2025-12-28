import express from 'express';
import mongoose from 'mongoose';
import {Server} from "socket.io";
import {createServer} from "node:http";
import cors from 'cors';
import {connectToSocket} from './controllers/socketManager.js';
const app = express();
import httpStatus from "http-status-codes";
import userRouter from './routes/userRouter.js';
import { Meeting } from './models/meetingModel.js';
const server = createServer(app);
const io = connectToSocket(server);

app.set('port', process.env.PORT || 8000);

app.use(cors());
app.use(express.json({limit: '40KB'}));    
app.use(express.urlencoded({ limit: '40KB',  extended: true }));

app.use('/api/v1/user', userRouter);

app.get('/home', (req, res)=>{
    res.json({"hello": "world"});
});


app.post("/meeting/checkMeeting" , async (req , res)=>{

    let { meetingCode } = req.body;
    console.log("request is coming "+ meetingCode);
    let meeting = await Meeting.findOne({meetingCode: meetingCode});
    if(meeting){
        return res.json({msg :"Meeting exist" , status : true});
    }
    else{
        return res.json({msg : "meeting does not exist" , status : false});
    }

})



const  start = async ()=>{
    
    await  mongoose.connect('mongodb+srv://ry957933_db_user:y9Y4TrMXVwV2NYjv@cluster0.qgjttie.mongodb.net/')


    console.log(`Connected to MongoDB ${mongoose.connection.host}`);

    server.listen(8000 , ()=>{
        console.log('Server is running on port 8000');
    })
}



const url2 = `https://meetly-9fnn.onrender.com`;
const interval = 5 * 60 * 1000; // 5 minutes

function reloadWebsite() {
  axios
    .get(url2)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);



start();