import {React,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {API} from '../config'

export function Parent(){
    const [nic,setnic] =useState("");
    const [password,setPassword] =useState("");
    const signInHandler=(e)=>{
      e.preventDefault();
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        if(nic.length<1 || password<1){
            toast.error("all fields are mandatory",{
                pauseOnHover: true,
                draggable: true,
                hideProgressBar: true,
                closeOnClick: false,
              });
        }else{
            let data={
                nic,password
            }
            API.post("/parentlogin",data)
            .then((res)=>{
                toast.success(res.data.message)
                sessionStorage.setItem("nic",nic)
                window.location="/parent"
            })
            .catch((err)=>{
                console.log(err);
                toast.warn(err.response.data.message)
            })
        }
    
    }
    return(
        <>
        <ToastContainer />

            <div className="row">
            <div  class="offset-md-2 col-md-8 text-center">
                <div className="col-md-12">
                    <h3 className="mb-1">Parent Check IN</h3>

                    <input type="text" name="nic" className="form-control" onChange={(e)=>setnic(e.target.value)} value={nic}   placeholder="NIC" />
                </div>
                <div className="col-md-12">
                    <input type="password" name="password"  className="form-control mt-3"  onChange={(e)=>setPassword(e.target.value)} value={password}   placeholder="password"/>
                </div>
              
                <div className="col-md-12 text-center mt-5">
                    <input className="btn btn-outline-primary" onClick={signInHandler} type="submit" name="submit" value="submit" />

                </div>
            </div>    
            </div>
          
      </>
    )
}