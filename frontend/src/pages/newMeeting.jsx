import React, { useContext, useEffect, useState } from 'react'
// import withAuth from '../utils/withAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField, unstable_useId } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../Navbar';
import Footer from '../footer';
function NewMeeting() {

     const {addToHistory} = useContext(AuthContext);
     

     let meetingCode = uuidv4();
   
    

     let handelCreateMeeting = async ()=> {
     
      await addToHistory(meetingCode);
      navigate(`/${meetingCode}`);
     }

    return ( 
     
       <>   
           <Navbar/>
          <div className="container-fluid hero">
                <div className="row">
                    <div className="col-12 col-md-1"></div>
                    <div className="col-12 col-md-6 main-content">
                    <h1 style={{fontWeight:"bold"}}>Your meeting is ready</h1>
                    <h3>Copy this meeting Code</h3>
                    <p>{meetingCode}</p>
                    <Button onClick={handelCreateMeeting} variant='contained'>Join</Button>
                    </div>

                    <div className="col-12 col-md-4 main-logo">
                    <img src="/undraw_online-meeting_qe61.svg" alt="" />
                    </div>
                   <div className="col-12 col-md-1"></div>
                </div>
            </div>
            <Footer/>
       </>
     );
}

export default NewMeeting;