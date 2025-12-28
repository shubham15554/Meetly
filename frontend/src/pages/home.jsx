import React, { useContext, useState } from 'react'
// import withAuth from '../utils/withAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, getAppBarUtilityClass, IconButton, TextField, unstable_useId } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../context/authContext';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../Navbar';
import NewMeeting from './newMeeting';
import withAuth from '../utils/withAuth';
import Footer from '../footer';
function Home() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const {addToHistory} = useContext(AuthContext);

    let handleJoinVideoCall = async () => {

        /// checke meeting exist or not 

        await addToHistory(meetingCode);
        navigate(`/${meetingCode}`)
    }


   

    return (
        <>
            <Navbar/>
           


             <div className="container-fluid ">
                <div className="row mt-5">
                    <div className="col-12 col-md-1"></div>
                    <div className="col-12 col-md-6 leftPanel mt-5">
                     <h2>Providing Quality Video Call</h2>
                    <p>Enjoy crystal-clear video calls with friends, family, or colleagues. Start or join meetings in seconds, anytime, anywhere.</p>
                    <div style={{display:"flex",  gap:"10px"}}>
                    <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                    <button className='btn btn-primary me-2' onClick={handleJoinVideoCall}>Join</button>
                    </div>
                    <button className='btn btn-outline-primary mt-3' onClick={()=>navigate('/NewMeeting')}>Create a new Meeting</button>
                    </div>

                    <div className="col-12 col-md-4 main-logo right-panel ">
                    <img src="/logo3.png" alt="" />
                    </div>
                   <div className="col-12 col-md-1"></div>
                </div>
            </div>
             <Footer/>
        </>
    )
}


export default withAuth(Home);