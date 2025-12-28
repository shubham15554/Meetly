import React, { useState, useRef, useEffect } from "react";
import { Badge, Experimental_CssVarsProvider, IconButton, listItemSecondaryActionClasses, TextField } from "@mui/material";
import { Button } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import  CallEndIcon from "@mui/icons-material/CallEnd";
import  MicIcon from "@mui/icons-material/Mic";
import  MicOffIcon from "@mui/icons-material/MicOff";
import  ScreenShareIcon from "@mui/icons-material/ScreenShare";
import  StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import  ChatIcon from "@mui/icons-material/Chat";

import { io } from "socket.io-client";
import styles from "../styles/vedioMeet.module.css"
import Navbar from "../Navbar";
import Footer from "../footer";
import { useNavigate } from "react-router-dom";
const server_url = `https://meetly-9fnn.onrender.com`;

let connections = {};

const peerConfigConnections  = {
     
    'iceServers' : [
        {"urls": "stun:stun.l.google.com:19302"}

    ]
}



function VedioMeet() {

    let navigate = useNavigate();

    let socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoRef = useRef();

    let [videoAvailble , setVideoAvailble] = useState(true);

    let [audioAvailble , setAudioAvailble] = useState(true);

    let [video , setVideo] = useState();

    let [audio , setAudio] = useState();

    let [screen , setScreen] = useState();

    let [showModal , setShowModal] = useState(false);

    let [screenAvailble , setScreenAvailble] = useState();

    let [messages , setMessages] = useState([]);

    let [message , setMessage] = useState("");

    let [newMessages , setNewMessages] = useState(0);

    let [askForUsername , setAskForUsername] = useState(true);

    let [username , setUsername] = useState("");

    const videoRef = useRef([]);

    const chatDisplayRef = useRef(null);

    let [videos , setVideos] = useState([]);

    React.useEffect(() => {
        if (chatDisplayRef.current) {
            chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
        }
    }, [messages]); 


    const getPermissons = async ()=>{

        try{
            const videoPermission = await navigator.mediaDevices.getUserMedia({video:true});

            if(videoPermission){
                setVideoAvailble(true);
            }
            else{
                setVideoAvailble(false);
            }
            const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true});

            if(audioPermission){
                setAudioAvailble(true);
                
            }
            else{
                setAudioAvailble(false);
            }

            if(navigator.mediaDevices.getDisplayMedia){
                setScreenAvailble(true);
            }
            else{
                setScreenAvailble(false);   
            }
            if(videoAvailble || audioAvailble){
                const userMediaStream = await navigator.mediaDevices.getUserMedia({video: videoAvailble , audio: audioAvailble});
              
               if(userMediaStream){
                window.localStream = userMediaStream;
                if(localVideoRef.current){
                    localVideoRef.current.srcObject = userMediaStream;
                }
               }
            }




        }
        catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        getPermissons();
    },[]);


    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoRef.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                console.log(description)
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoRef.current.srcObject = window.localStream

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }


    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }
    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }


    let getUserMedia = () => {
        if ((video && videoAvailble) || (audio && audioAvailble)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }



    useEffect(()=>{
        if(video != undefined || audio != undefined){
            getUserMedia();
        }
    },[video , audio]);

let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }

    // todo

        let addMessage = (data, sender, socketIdSender) => {
            setMessages(prevMessages => [
                ...prevMessages,
                { sender, data }
            ]);

            if (socketIdSender !== socketIdRef.current) {
                setNewMessages(prev => prev + 1);
            }
        };



       let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on('chat-message', addMessage)

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })

               socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {

                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    // Wait for their ice candidate       
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }

                    // Wait for their video stream
                    connections[socketListId].onaddstream = (event) => {
                        console.log("BEFORE:", videoRef.current);
                        console.log("FINDING ID: ", socketListId);

                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            console.log("FOUND EXISTING");

                            // Update the stream of the existing video
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            // Create a new video
                            console.log("CREATING NEW");
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            };

                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    };


                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
                })

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue

                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }

    let getMedia = ()=>{
        setVideo(videoAvailble);
        setAudio(audioAvailble);
        
        connectToSocketServer();
    }



    let connect = ()=>{
        setAskForUsername(false);
        getMedia();
    }


    let handleVideo = ()=>{
        setVideo(!video);
    }


    let handleAudio = () =>{
        setAudio(!audio);
    }
    

    let sendMessage = ()=>{
        socketRef.current.emit("chat-message" , message , username);
        setMessage("");
    }


    let handleEndCall = ()=>{

        try{
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            navigate("/");
        }
        catch(e){
          console.log(e);
          
        }
    }



    let handleScreen = async() => {
        setScreen(!screen);
    }

    let getDislayMediaSuccess = (stream) => {
        console.log("HERE")
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoRef.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            getUserMedia()

        })
    }


    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }


    useEffect(()=>{
        if(screen !== undefined){
            getDislayMedia();
        }
    },[screen])




    return ( 
        <div>
            {askForUsername === true ?
                <>
                <Navbar/>
                <div className="container">
                    <div className="row mt-5">
                    <div className="col-12  col-md-6 p-5">
                        <h2>Enter Your Username</h2>
                        <TextField className="mt-3" id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)} />
                        <div className="mt-3"><Button variant="contained" onClick={connect}>Connect</Button></div>
                    </div>
                    <div className=" col-12 col-md-6 mt-5 lobbyVideo">
                        <video ref={localVideoRef} autoPlay muted></video>
                    </div>
                    </div>


                </div>
                <Footer/>
                </>
                 : <>


                <div className={styles.meetVideoContainer}>
                <div className={styles.buttonContainer}>
                    <IconButton style={{color : "white"}} onClick={handleVideo}>
                    {(video === true) ? <VideocamIcon/> : <VideocamOffIcon/> }
                    </IconButton>
                    <IconButton style={{color : "red" }} onClick={handleEndCall}>
                     <CallEndIcon/>
                    </IconButton>
                    <IconButton style={{color : "white" }}  onClick={handleAudio}>
                     {audio === true ? <MicIcon/> : <MicOffIcon/>}
                    </IconButton>

                    {screenAvailble === true ? 
                    <IconButton style={{color : "white" }} onClick={handleScreen}>
                        {screen === true ? <ScreenShareIcon/> : <StopScreenShareIcon/>  }
                    </IconButton> : <></>}

                    <Badge badgeContent={newMessages} max={999} color="secondary">
                        <IconButton style={{color : "white" }} onClick={()=>setShowModal(!showModal)}>
                            <ChatIcon/>
                        </IconButton>
                    </Badge>

                </div>


                <div className={styles.meetUserVideo}><video  ref={localVideoRef} autoPlay muted></video></div>
                <div className={styles.confrenceVideosContainer}>
                 {videos.map((video)=>(
                    <div className={styles.confrenceVideo}>
                        <video
                        data-socket={video.socketId}
                        key={video.socketId} 
                        ref={
                            ref=>{
                                if(ref && video.stream){
                                    ref.srcObject = video.stream;
                                }
                            }
                        }
                        autoPlay>
                       </video>
                    </div>  
                 ))} 
                </div> 


                {showModal ? 
                   <div className={styles.chatRoom}> 
                        <div className={styles.chatHeader}>
                            <h3>Chat</h3>
                        </div>

                        <div className={styles.chatDisplay} ref={chatDisplayRef}>
                            {  messages.length > 0 ?    messages.map((item  ,index)=>{
                                    
                                    return (
                                        <div  style={{marginBottom:"10px"}} key={index}> 
                                            <p style={{fontWeight:"bold", marginBottom:"0px", color:" #1a3d7c"} } >{item.sender}</p>
                                             <div className={styles.messageBox}><p>{item.data}</p></div>
                                        </div>
                                    )
                                }) : <p>No messages yet</p>

                            }
                        </div>
                        
                        <div className={styles.chattingArea}>
                            <TextField
                            label="Enter Your Chat"
                            variant="outlined"
                            value={message}
                            className="chatBox"
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                height: 40, 
                                width: 250,
                                },
                                '& .MuiOutlinedInput-input': {
                                padding: '5px 14px', 
                                height: '100%',
                                boxSizing: 'border-box',
                                },
                            }}
                            />
                            <Button variant='contained' onClick={sendMessage}>Send</Button>
                        </div>
                   </div>:<></>
                   }

                
                </div>
           
               </>
            }



        </div>
     );
}

export default VedioMeet;