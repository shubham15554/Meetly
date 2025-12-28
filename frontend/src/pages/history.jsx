import React, { useContext, useEffect, useState } from 'react'
import  {AuthContext}  from '../context/authContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

import { IconButton } from '@mui/material';
import Navbar from '../Navbar';
import Footer from '../footer';
export default function History() {


    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])


    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch(e) {
                 console.log(e);
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <>
        <Navbar/>
        <div>
            
            {
                ( meetings &&  meetings.length !== 0) ? meetings.map((e, i) => {
                    return (

                        <>

                           
                             <Card key={i} variant="outlined">


                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Code: {e.meetingCode}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Date: {formatDate(e.date)}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Name: {e.userId}
                                    </Typography>

                                </CardContent>


                            </Card>
                      


                        </>
                    )
                }) 
                
                
                
                
                
                : <div className="container text-center mt-5 mb-5" style={{height:"100vh"}}>
                    
                </div>

            }

        </div>
         <Footer/>
         </>
    )
}