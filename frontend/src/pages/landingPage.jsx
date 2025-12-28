import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar';
import Footer from '../footer';
export default function LandingPage() {


    const router = useNavigate();

    return (
        <>
        <div className=''>

            <Navbar/>
            <div className="container-fluid hero">
                <div className="row">
                    <div className="col-12 col-md-1"></div>
                    <div className="col-12 col-md-6 main-content">
                    <h1>Connect Instantly with </h1>
                    <h1>Meetly</h1>
                    <p>Enjoy crystal-clear video calls with friends, family, or colleagues. Start or join meetings in seconds, anytime, anywhere.</p>
                    <button className='btn btn-primary me-2' onClick={()=>router('./auth')}>Get Started</button>
                    <button className='btn btn-outline-primary' onClick={()=>{router('/guestJoin')}}>Join as Guest</button>
                    </div>

                    <div className="col-12 col-md-4 main-logo">
                    <img src="/undraw_blogging_38kl.svg" alt="" />
                    </div>
                   <div className="col-12 col-md-1"></div>
                </div>
            </div>



            <div className='row  middle' >
                <div className='col'>
                    <h1>What is Meetly?</h1>
                    <p>Meetly is a modern, lightweight video meeting platform designed to make online collaboration effortless.<br></br> Whether you're hosting a team meeting, running a class, or catching up with friends,<br></br> Meetly gives you a smooth, no-fuss experience with powerful extras like meeting history and attendee tracking — all in one place.</p>
                </div>
            </div>
            

            <div className='card-container'>
                <h1>Built for You</h1>
                <div className="cards mt-5">
                    <div className="card mb-3" style={{width: "22rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">📅 Meeting History</h5>
                            <p className="card-text">Access a complete log of your past video calls — including times, users, and duration.</p>
                        </div>
                     </div>

                <div className="card mb-3" style={{width: "22rem"}}>
                <div className="card-body">
                    <h5 className="card-title">💬 Real-Time Video & Chat</h5>
                    <p className="card-text">High-quality video, audio, and messaging — all in one sleek, responsive interface.</p>
                </div>
                </div>
                
                <div className="card mb-3" style={{width: "22rem"}}>
                <div className="card-body">
                    <h5 className="card-title">✨ Simple & Intuitive</h5>
                    <p className="card-text">Clean design with zero clutter. Meetly is built for humans, not just techies.</p>
                </div>
                </div>
                </div>
            </div>


            <div className="container-fluied">
               
               <div className='container mt-5 ' style={{textAlign: "center"}}>
                <h1>How It Works</h1>
               <p>Just a few simple steps to start, connect, and stay on top of every meeting</p>
               </div>



            <div className="steps">

                
                    <div className="col-12 col-md-2"></div>

                    <div className="col-12 col-md-4">
                        <div className="left">
                        <img src="/scott-graham-5fNmWej4tAA-unsplash.jpg" alt="" />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="right" style={{ padding: "2rem" }}>
                        <h2>🚀 Start or Join Instantly</h2>
                        <p>Click log in to launch a meeting in seconds — no setup or downloads.</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-2"></div>
               


                <div className="row mt-5">
                     <div className='col-12 col-md-2'></div>

                     <div className="col-12 col-md-4">
                       <div className="right" style={{padding: "2rem"}}>
                        <h2>🔗 Share the Link</h2>
                        <p>Click log in to launch a meeting in seconds — no setup or downloads.</p>
                       </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="left">
                        <img src="/walls-io-8mxs2EDYGKQ-unsplash.jpg" alt="" />
                      </div>
                    </div>
                     <div className='col-12 col-md-2'></div>
                </div>



                <div className="row mt-5">
                     <div className='col-12 col-md-2'></div>
                    <div className="col-12 col-md-4">
                      <div className="left">
                        <img src="headway-5QgIuuBxKwM-unsplash.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                       <div className="right" style={{padding: "2rem"}} >
                        <h2>📊 View History & Attendees</h2>
                        <p>After the call, see a complete meeting history and who attended — all in your dashboard.</p>
                       </div>
                    </div>
                     <div className='col-12 col-md-2'></div>
                </div>

                </div>




            </div>







        

        </div>
        <Footer/>
        </>
    )
}