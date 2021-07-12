import {React,useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';


const iconBus = new L.Icon({
    iconUrl: 'https://static.thenounproject.com/png/1661272-200.png',
    
    iconSize: new L.Point(50, 65),
    className: 'leaflet-div-icon'
});

export default function Navigation(){

    const [lat,setLat]=useState('');
    const [long,setLong]=useState('');
    const [currentPos,setCpostion]=useState(null)
    const [latlngStyle,setStyle]=useState({});
    
    function handleClick(e){
        
        setCpostion(e.latlng);
        setLat(e.latlng.lat.toFixed(10));
        setLong(e.latlng.lng.toFixed(10));
        setStyle({
            color:'green',
            fontSize:'1.1rem',
            fontWeight:'bold',
            border:'4px solid'
        });
        setTimeout(()=>{setStyle({})},1000)
    }


    return(
        <MapContainer center={[30.3753,69.3451]} style={{height:'80vh'}} zoom={6} onClick={handleClick} >
        <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        { currentPos && 
        <Marker position={currentPos} draggable={true}
        icon={  iconBus    }
        >
            <Popup position={currentPos}>
            Current location: <pre>{JSON.stringify(currentPos, null, 2)}</pre>
            </Popup>
        </Marker>}
    </MapContainer>
    )
}