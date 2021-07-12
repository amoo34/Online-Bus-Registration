import {React,useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import Header from "./header"
import {API} from '../config'
import { ToastContainer, toast } from 'react-toastify';

const iconBus = new L.Icon({
    iconUrl: 'https://static.thenounproject.com/png/1661272-200.png',
    
    iconSize: new L.Point(50, 65),
    className: 'leaflet-div-icon'
});


export default function ParentTracker(){

    const [lat,setlat]=useState(null);
    const [long,setlong]=useState(null);
    const [student,setBuses]=useState(null);
    const [load,setLoad]=useState(true)
    useEffect(()=>{

        navigator.geolocation.getCurrentPosition(async function(position) {
            setlat(position.coords.latitude);
            setlong(position.coords.longitude);
            getStudent();

            setLoad(false)
                      
        });

        setInterval(()=>{

            getStudent();

        },20000)

    },[])



    const getStudent=()=>{
        
        API.get("getStudentByNic/"+sessionStorage.getItem("nic"))
        .then(async (res)=>{
            var data=[]
            await Promise.all( res.data.map(async(student)=>{

                await API.get("getstudentlocation/"+student.regNumber)
                .then((res)=>{

                    let busDetail={
                        regNumber:student.regNumber,
                        lat:res.data.lat,
                        long:res.data.long,
                    }
                    if(res.data.lat){

                        data.push(busDetail)
                    }
                })

                .catch((err)=>{
                    console.log(err);
                })

            }))
            console.log(data)
            setBuses(data);
            console.log(data.length)
            if(data.length==0){
                toast.error("sorry! no student found")
            }
        })
        .catch((err)=>{
            // console.log(err);
        });

    }



    return(
        <>
        <Header/>
        <ToastContainer />
        {
        load ? (null) :
        
        <MapContainer className="markercluster-map"  style={{marginTop:'4em',height:'100vh',width:'100%',marginRight:'-17px !important'}} center={[lat,long]} zoom={5} scrollWheelZoom={true}>
       
        <TileLayer
        style={{background:'black'}}
        attribution='&copy; <a href="https:thinkiot.com.pk">ThinkIOT SJ Developers </a>'

        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {student &&
        student.map((student)=>{
            return(

                <Marker icon={iconBus} position={[student.lat,student.long]}>
                    <Popup>
                        <b>Student is here <br/> Reg Number{student.regNumber}</b>.
                    </Popup>
                </Marker>
            )
        })
        }

        </MapContainer>
    }
        </>
    )
}