import {React,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {API} from '../config'

export function Driver1(){
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");

    const signInHandler=(e)=>{
        // alert()
        e.preventDefault();
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        if(email.length<1 || password<1){
            toast.error("all fields are mandatory",{
                pauseOnHover: true,
                draggable: true,
                hideProgressBar: true,
                closeOnClick: false,
              });
        }else{
            let data={
                email:email,
                password
            }
            API.post("driverLogin",data)
            .then((res)=>{
                sessionStorage.setItem("email",email);
                localStorage.setItem("id",res?.data?.user?._id)
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
                    <input type="email" name="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} value={email}   placeholder="Driver email" />
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