import {  createContext, useContext, useState } from "react";
import axios from "axios";
import  httpStatus from "http-status-codes";


import React from "react";
import { useEffect  } from "react";


import { useNavigate } from "react-router-dom";
export const  AuthContext = createContext({});



export  const AuthProvider = ({children}) => {
   
  const navigate = useNavigate(); 
   const [userData , setUserData] = useState();


    const handleRegister =  async (name , username , password)=>{
       try{
       
        let request = await axios.post("https://meetly-9fnn.onrender.com/api/v1/user/register" , {
            name : name,
            username: username,
            password: password
         } );
        
         if(request.status === httpStatus.CREATED){
           return request.data.msg;
           alert("Registered Successfully");
         }
       }
        catch(err){
          throw err;
          
        }
    }

    const handleLogin =  async (username,password)=>{
       try{
          
         let request = await axios.post("https://meetly-9fnn.onrender.com/api/v1/user/login" , {
            username: username,
            password: password
         } );

         if(request.status === httpStatus.OK){
           localStorage.setItem("token" , request.data.token);
           navigate("/home");
         }
       }
        catch(error){
          throw error;
        }
    }


    const getHistoryOfUser = async () =>{
      try{
        let req = await axios.get("https://meetly-9fnn.onrender.com/api/v1/user/get_all_activity" , {
          params:{
            token : localStorage.getItem("token")
          }
        }); 

        console.log("history of the user : " + req);

        return req.data;

      }
      catch(e){
        console.log(e);
      }
    }

    const addToHistory = async (meetingCode) =>{
      try{
        console.log("Adding to history");
        let req = await axios.post("https://meetly-9fnn.onrender.com/api/v1/user/add_to_activity" , {
          token : localStorage.getItem("token"),
          meeting_code : meetingCode
        });

        return req;
      }
      catch(e){
        console.log(e);
        throw e
      }
    } 









    let data = {
        userData, setUserData , handleRegister , handleLogin,getHistoryOfUser,addToHistory
    }


    return (

        <AuthContext.Provider value={data}>
           {children}
        </AuthContext.Provider>
    )




}