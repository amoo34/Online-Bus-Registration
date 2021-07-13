import {React,useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import {API} from '../config'
import socketClient from 'socket.io-client'

const iconBus = new L.Icon({
    iconUrl: 'https://static.thenounproject.com/png/1661272-200.png',
    
    iconSize: new L.Point(50, 65),
    className: 'leaflet-div-icon'
});

let socket = ""

export default function MapDashboard(){

    
    const [lat,setlat]=useState(null);
    const [long,setlong]=useState(null);

    useEffect(()=>{

        socket = socketClient('http://127.0.0.1:3001',{
            query: {
                id: localStorage.getItem("id") || 123
              }   
        ,
            reconnection: true,
        });
        socket.on("connection", () => {
            console.log("ON-CONNECTION");
          });
        console.log(socket)
    },[])

    useEffect(()=>{
            const tInterval = setInterval(()=>{
            navigator.geolocation.getCurrentPosition(function(position) {
                setlat( position.coords.latitude);
                setlong(position.coords.longitude);
                let data={
                    id:localStorage.getItem("id"),
                    lat:position.coords.latitude,
                    long:position.coords.longitude,
                    startingPoint:sessionStorage.getItem("startingPoint"),
                    destination:sessionStorage.getItem("destination")
                }
            socket.emit("updatedLocation",data)
            //     API.post("setBusLocation",data)
            //     .then((res)=>console.log(res))
            //     .catch((err)=>console.log(err));
            //     console.log(position)
            // 
        });
    },10000)

    return ()=>{
        clearInterval(tInterval)
    }
        
    })



    return(

        <MapContainer className="markercluster-map"  style={{height:'100vh',width:'100%',marginRight:'-17px !important'}} center={[30.3753,69.3451]} zoom={5} scrollWheelZoom={true}>
       
        <TileLayer
        style={{background:'black'}}
        attribution='&copy; <a href="https:thinkiot.com.pk">ThinkIOT SJ Developers </a>'

        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lat &&
        <Marker icon={iconBus} position={[lat,long]}>
            <Popup>
                <b>bus is here</b>.
            </Popup>
        </Marker>
        }

        </MapContainer>
    )
}