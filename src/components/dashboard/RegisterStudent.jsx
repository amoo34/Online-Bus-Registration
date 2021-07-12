import {React,useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import Header from "./header"
import { ToastContainer, toast } from 'react-toastify';
import {API} from '../config'


export default function RegisterStudent(){

    const [regNumber,setRegNumber]=useState("");
    const [nic,setNic]=useState(sessionStorage.getItem("nic"));
    const [isfee,setisfee]=useState("");
    const [password,setPassword]=useState("");


    const handelSubmit=(e)=>{
        e.preventDefault();
        if(regNumber=="" || nic=="" || isfee=="" || password==""){
            toast.error("all fields are mandatory");
        }else{
            let data={
                regNumber,nic,isfee,password
            }
            API.post("studentregister",data)
            .then((res)=>{
                toast.success("Student Registered Successfully");
                setisfee("")
                setRegNumber("")
                setPassword("")
            })
            .catch((err)=>{
                toast.error(err.response.data.message)
            })

        }
    }

    return(
        <>
        <ToastContainer />

        <Header/>
        <div className="row">
            <div className="offset-md-3 col-md-6">
                <div className="row text-center mt-5 pt-4 pl-2 pr-2">
                    <div className="col-md-12 text-center mt-4 mb-4">
                       <h3>
                           Student Registeration
                           </h3> 
                    </div>
                    <div className="offset-md-2 col-md-8 mb-2">
                        <input type="text" className="form-control" onChange={(e)=>setRegNumber(e.target.value)} name="reg" placeholder="Student Registration#" />
                    </div><br />

                    <div className="offset-md-2 col-md-8 mt-3 mb-2">
                        <select name="fee" id=""  onChange={(e)=>setisfee(e.target.value)} className="form-control">
                            <option value="">IS FEE PAID</option>
                            <option value="yes">YES</option>
                            <option value="no">NO</option>
                        </select>
                    </div><br />
                    <div className="offset-md-2 col-md-8 mt-3 ">
                        <input type="password"  onChange={(e)=>setPassword(e.target.value)} className="form-control" name="pass" placeholder="password" />
                    </div><br />
                    <div className="col-md-12 text-center mt-5">
                        <input className="btn btn-outline-primary" onClick={handelSubmit} type="submit"  value="submit" />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}