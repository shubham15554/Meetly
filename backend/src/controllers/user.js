import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import httpStatus from "http-status-codes";
import { Meeting } from "../models/meetingModel.js";

const register = async (req, res) => {

    console.log("Register endpoint hit");
    
    let {name , username , password} = req.body;

    try{
        if(!name || !username || !password){
        return res.status(400).json({msg: "Please provide all values"});
    }

    const existingUser = await User.findOne({username});
    if(existingUser){
        return res.status(httpStatus.CONFLICT).json({msg: "Username already taken"});
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const newUser = new User({
        name : name,
        username : username,
        password : hashedPassword,
    });

    await newUser.save();
    res.status(httpStatus.CREATED).json({msg: "User registered successfully"});
    }
    catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg: "Server error"});
        console.log(err);
    }


}


const login = async (req, res) => {
    
    let {username , password} = req.body; 

    try{
        if(!username || !password){
        return res.status(400).json({msg: "Please provide all values"});
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({msg: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(isPasswordCorrect){
            let token = crypto.randomBytes(16).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({msg: "logged in successfully" , token});
        }
        else{
            return  res.status(httpStatus.UNAUTHORIZED).json({msg: "Invalid credentials"});
        }


    }
    catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg: "Server error"});
    }

}






const getUserHistory = async (req , res ) =>{
    let {token} = req.query;
    console.log("token is coming " + token)
    try{
        const user = await User.findOne({token : token});
        console.log(user)
        const meetings =  await Meeting.find({});
       
        res.json(meetings);
    }
    catch(e){
        res.status(500).json({msg : "Server error"});
    }
}



const addToHistory = async (req , res) =>{
    let {token , meeting_code} = req.body;   
    console.log(req.body);
    try{
        const user = await User.findOne({token : token});
        console.log(user);
        const newMeeting = new Meeting({
            userId : user.username,
            meetingCode : meeting_code,
        });

        console.log(newMeeting);
        
        await newMeeting.save();
        
        res.json({msg : "Meeting added to history"});
    }
    catch(e){
        res.status(500).json({msg : "Server error"});
    }
   

}

export {register , login , addToHistory, getUserHistory};
