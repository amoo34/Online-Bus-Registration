import {React,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {API} from '../config'

export function Driver(){
    const [busnumber,setBusNumber] =useState("");
    const [password,setPassword] =useState("");
    const [startingPoint,setStartingPoint] =useState("");
    const [destination,setDestination] =useState("");
    const signInHandler=(e)=>{
        // alert()
        e.preventDefault();
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        if(busnumber.length<1 || password<1){
            toast.error("all fields are mandatory",{
                pauseOnHover: true,
                draggable: true,
                hideProgressBar: true,
                closeOnClick: false,
              });
        }else{
            let data={
                busNumber:busnumber,
                password
            }
            API.post("buslogin",data)
            .then((res)=>{
                sessionStorage.setItem("busNumber",busnumber);
                sessionStorage.setItem("startingPoint",startingPoint);
                sessionStorage.setItem("destination",destination);
                toast.success(res.data.message);
                window.location="/dashboard";
            })
            .catch((err)=>{
                console.log(err)
                toast.warn(err.response.data.message)
            })
        }
    
    }
    return(
        <>
        <ToastContainer />

        {/* <form method="post" action="#" onSubmit={(e)=>signInHandler(e)} > */}
            <div className="row">
            <div  class="offset-md-2 col-md-8 text-center">

                <div className="col-md-12">
                    <h3 className="mb-1">Bus Check IN</h3>
                    <input type="text" name="busnumber" className="form-control" onChange={(e)=>setBusNumber(e.target.value)} value={busnumber}   placeholder="Bus number" />
                </div>
                <div className="col-md-12 mt-3">
                    <input type="text" name="startingPoint" className="form-control" onChange={(e)=>setStartingPoint(e.target.value)} value={startingPoint}   placeholder="Starting Point" />
                </div>
                <div className="col-md-12 mt-3">
                    <input type="text" name="destination" className="form-control" onChange={(e)=>setDestination(e.target.value)} value={destination}   placeholder="Destination" />
                </div>
                <div className="col-md-12">
                    <input type="password" name="password"  className="form-control mt-3"  onChange={(e)=>setPassword(e.target.value)} value={password}   placeholder="password"/>
                </div>
              
                <div className="col-md-12 text-center mt-5">
                    <input className="btn btn-outline-primary" onClick={signInHandler} type="submit" name="submit" value="submit" />
                </div>
            </div>    
            </div>
          
        {/* </form> */}
      </>
    )
}