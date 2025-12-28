

import {   Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect , useState  } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../footer";
function GuestJoin() {

    let [meetingCode , setMeetingCode] = useState();
    
    let Navigate = useNavigate();


    let handleClick = async ()=>{
        // let res = await axios.post("http://localhost:8000/meeting/checkMeeting" , {meetingCode : meetingCode});
    
        // console.log(res);
        // if(res.data.status == false){
        //     console.log("meeting does not exist");
        // }
        // if(res.data.status == true){
        //     console.log("meeting exist");
        //     Navigate(`/${meetingCode}`)
        // }
        Navigate(`/${meetingCode}`)
    }

    return ( 
        <>
         <Navbar/>
            <div className="container-fluid hero">
                <div className="row">
                    <div className="col-12 col-md-1"></div>
                    <div className="col-12 col-md-6 main-content">
                   <h2>Enter in to the loby</h2>
                   <TextField id="outlined-basic" label="Meeting code" variant="outlined" value={meetingCode} onChange={(e)=>setMeetingCode(e.target.value)} />
                    <div className="mt-3"><button className="btn  btn-primary " onClick={handleClick}> Join </button></div>
                    </div>

                    <div className="col-12 col-md-4 main-logo">
                    <img src="undraw_online-meetings_zutp.svg" alt="" />
                    </div>
                   <div className="col-12 col-md-1"></div>
                </div>
            </div>

          <Footer/>



           
        </>
    );
}

export default GuestJoin;