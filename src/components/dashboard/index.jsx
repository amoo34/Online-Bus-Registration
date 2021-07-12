import React,{useEffect,useState} from 'react';
import Header from './header';
import './index.css'
import {Link} from 'react-router-dom'
import {API} from '../config'

export default function ParentalDashboard(){
    const [students,setStudentsNumber]=useState(0);
    useEffect(()=>{
        API.get("getStudentByNic/"+sessionStorage.getItem("nic"))
        .then((res)=>{
            setStudentsNumber(res.data.length)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return(
        <>
        <Header/>
        <div className="row">
            <div className="col-md-6 tile">
                <h5>Total Student</h5>
                <b>{students }</b>
            </div>
            <div className="col-md-6 tile">
                Register Student &emsp;<Link to="/registerStudent"> <br />
                <div style={{fontSize:'2em',margin:'auto'}} className="fa text-center mx-auto fa-plus"></div></Link>
            </div>
        </div>
        </>
    )
}