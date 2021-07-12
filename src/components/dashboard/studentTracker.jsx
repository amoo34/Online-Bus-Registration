import {React,useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import {API} from '../config'
import { ToastContainer, toast } from 'react-toastify';


const iconBus = new L.Icon({
    iconUrl: 'https://static.thenounproject.com/png/1661272-200.png',
    
    iconSize: new L.Point(50, 65),
    className: 'leaflet-div-icon'
});


export default function StudentTracker(){

    
    const [lat,setlat]=useState(null);
    const [long,setlong]=useState(null);
    const [bus,setBuses]=useState(null);
    const [load,setLoad]=useState(true)
    useEffect(()=>{

        navigator.geolocation.getCurrentPosition(async function(position) {
            setlat( position.coords.latitude);
            setlong(position.coords.longitude);
            getBus();

            setLoad(false)
                      
        });
    
        setInterval( async  () => {
            
            navigator.geolocation.getCurrentPosition(async function(position) {
                setlat( position.coords.latitude);
                setlong(position.coords.longitude);
                let data={
                    id:sessionStorage.getItem("regNumber"),
                    lat:position.coords.latitude,
                    long:position.coords.longitude
                }

                await API.post("setStudentLocation",data)
                .then((res)=>{
                    {
                        return true
                    }
                })
                .catch((err)=>{});
                
            });
        
           
        }, 10000);

        setInterval(()=>{

            getBus();
        },20000)
    },[])


    const getBus=()=>{
        
        API.get("getbus")
        .then(async (res)=>{
            var data=[]
            await Promise.all( res.data.map(async(bus)=>{

                await API.get("getbuslocation/"+bus.busNumber+"/"+sessionStorage.getItem("studentDest"))
                .then((res)=>{

                    let busDetail={
                        busNumber:bus.busNumber,
                        lat:res.data.lat,
                        long:res.data.long,
                        starting:res.data.startingPoint,
                        destination:res.data.destination,
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
                toast.error("sorry! no bus is on your route")
            }
        })
        .catch((err)=>{
            // console.log(err);
        });

    }



    return(
        load?
            <small className="text-center">Loading...</small>
            :
        <>
        <ToastContainer />

        <MapContainer className="markercluster-map"  style={{height:'100vh',width:'100%',marginRight:'-17px !important'}} center={[lat,long]} zoom={5} scrollWheelZoom={true}>
       
        <TileLayer
        style={{background:'black'}}
        attribution='&copy; <a href="https:thinkiot.com.pk">ThinkIOT SJ Developers </a>'

        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bus ?
        bus.map((bus)=>{
            return(

                <Marker icon={iconBus} position={[bus.lat,bus.long]}>
                    <Popup>
                        <b> Bus Number : {bus.busNumber} <br/> Starting Point : {bus.starting} <br/> Destination: {bus.destination} </b>.
                    
                    </Popup>
                </Marker>
            )
        })
        :
        <Marker icon={iconBus} position={[lat,long]}>
                    <Popup>
                        <b> You are here </b>.
                    
                    </Popup>
        </Marker>
        }

        </MapContainer>
        </>
    )
}