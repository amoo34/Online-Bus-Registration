import { ToastContainer, toast } from 'react-toastify';
import {React,useState} from 'react';
import {API} from '../config';
import Geocode from "react-geocode";
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { GoogleMap, LoadScript,Marker  } from '@react-google-maps/api';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
Geocode.setApiKey("AIzaSyC99a4WKQbNk19HUyitwVuUJy-ykZco-CM");
Geocode.enableDebug();
function DriverSignUp1 (props){

    const [map,setMap]=useState(false);
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(email=="" || name=="" ||  password==""){
            toast.error("Each field is mandatory",{
                pauseOnHover: true,
                draggable: true,
                hideProgressBar: true,
                closeOnClick: false,
            });

        }else{
            let data={
                email,
                name,
                password
            }
            API.post("driverSignup",data)
            .then((res)=>{
                toast.success("Bus registered successfully",{
                    pauseOnHover: true,
                    draggable: true,
                    hideProgressBar: true,
                    closeOnClick: true,
                });
                window.location="/";

            })
            .catch((err)=>{
                toast.error(err.response.data.message,{
                    pauseOnHover: true,
                    draggable: true,
                    hideProgressBar: true,
                    closeOnClick: false,
                });
            })

        }
    }
    const containerStyle = {
        width: '90vw',
        height: '400px'
      };
      

    // AIzaSyC99a4WKQbNk19HUyitwVuUJy-ykZco-CM
    return(
        <>
        <ToastContainer />

        <form >
            <div className="row pl-3 pr-3">
                <div className="col-md-12 text-center mb-3 ">
                    <h3>Bus Registration</h3>
                </div>
               <>
                <div className="col-md-6">
                    <input type="email" name="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}  placeholder="Email" />
                </div>
                <div className="col-md-6 mt-3">
                    <input type="text" name="name"  className="form-control"   onChange={(e)=>setName(e.target.value)} placeholder="Driver Name"/>
                </div>
                </>
                <div className="col-md-12 text-center mt-1">
                    <input type="password" name="password" className="form-control mt-3"  onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
                </div>
              
                <div className="col-md-12 text-center mt-5">
                    <button className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
          
        </form>
      </>
    )
}

export default DriverSignUp1
    // apiKey: ("AIzaSyC99a4WKQbNk19HUyitwVuUJy-ykZco-CM")
  