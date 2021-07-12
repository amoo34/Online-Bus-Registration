import { ToastContainer, toast } from 'react-toastify';
import {React,useState} from 'react';
import {API} from '../config';
import Geocode from "react-geocode";
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { GoogleMap, LoadScript,Marker  } from '@react-google-maps/api';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
Geocode.setApiKey("AIzaSyC99a4WKQbNk19HUyitwVuUJy-ykZco-CM");
Geocode.enableDebug();
function DriverSignUp (props){
    const [map,setMap]=useState(false);
    const [busNumber,setBusNumber]=useState("")
    const [drivername,setDriverName]=useState("")
    const [startingPoint,setStartingPoint]=useState("")
    const [destination,setDestination]=useState("")
    const [password,setPassword]=useState("")
    const [startMarkerPosition,setStartMarkerPosition] = useState({
        lat: 31.52, lng: 74.3587
    })
    const [endMarkerPosition,setEndMarkerPosition] = useState({
        lat: 31.62, lng: 74.8587
    })
    const [startingAddress,setStartingAddress] = useState("")
    const [endingAddress,setEndingAddress] = useState("")
    const handleSubmit=(e)=>{
        e.preventDefault();

        if(busNumber=="" || drivername=="" ||  password==""){
            toast.error("Each field is mandatory",{
                pauseOnHover: true,
                draggable: true,
                hideProgressBar: true,
                closeOnClick: false,
            });

        }else{
            let data={
                busNumber,
                drivername,
                startMarkerPosition,
                endMarkerPosition,
                startingAddress,
                endingAddress,
                password
            }
            API.post("busregister",data)
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
      
      const onLoad = marker => {
        console.log('marker: ', marker)
      }
      const markerEnd1 =(event)=>{
        const newLat = event.latLng.lat()
        const newLng = event.latLng.lng()
        Geocode.fromLatLng( newLat , newLng ).then(
            response => {
                const address = response.results[0].formatted_address
                const newLat = event.latLng.lat();
                const newLng = event.latLng.lng();
                setStartMarkerPosition({
                    lat:newLat,
                    lng:newLng
                })
                setStartingAddress(address)
                console.log(address)
            },
            error => {
                console.error(error);
            }
            );
          
      }
      const markerEnd2 =(event)=>{
        
        const newLat = event.latLng.lat()
        const newLng = event.latLng.lng()
        Geocode.fromLatLng( newLat , newLng ).then(
            response => {
                const address = response.results[0].formatted_address
                const newLat = event.latLng.lat();
                const newLng = event.latLng.lng();
                setEndingAddress(address)
                setEndMarkerPosition({
                    lat:newLat,
                    lng:newLng
                })
                console.log(address)
            },
            error => {
                console.error(error);
            }
            );
    }
    // AIzaSyC99a4WKQbNk19HUyitwVuUJy-ykZco-CM
    return(
        <>
        <ToastContainer />

        <form >
            <div className="row pl-3 pr-3">
                <div className="col-md-12 text-center mb-3 ">
                    <h3>Bus Registration</h3>
                </div>
                {map?
                <LoadScript
                googleMapsApiKey="AIzaSyC99a4WKQbNk19HUyitwVuUJy-ykZco-CM"
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={startMarkerPosition}
                  zoom={10}
                >
                  { /* Child components, such as markers, info windows, etc. */ }
                  <Marker
                    // onLoad={onLoad}
                    position={startMarkerPosition}
                    draggable ={true}
                    onDragEnd={markerEnd1}
                    />
                    <Marker
                    // onLoad={onLoad}
                    position={endMarkerPosition}
                    draggable ={true}
                    onDragEnd={markerEnd2}
                    />
                </GoogleMap>
              </LoadScript>
                :
                <>
                <div className="col-md-6">
                    <input type="text" name="busNumber" className="form-control" onChange={(e)=>setBusNumber(e.target.value)}  placeholder="Bus Number" />
                </div>
                <div className="col-md-6 mt-3">
                    <input type="text" name="drivername"  className="form-control"   onChange={(e)=>setDriverName(e.target.value)} placeholder="Driver Name"/>
                </div>
                </>
                }



                <div className="col-md-6">
                    <input type="text" name="startpoint"  className="form-control mt-3"  onChange={(e)=>setStartingPoint(e.target.value)} placeholder=" Starting point "/>
                </div>
                <div className="col-md-6">
                    <input type="text" name="destination"  className="form-control mt-3"  onChange={(e)=>setDestination(e.target.value)} placeholder=" Destination point " />
                </div>
                <div className="col-md-12 text-center mt-1">

                    <p onClick={()=>setMap(!map)} style={{cursor:'pointer'}} title="this is toggle btn">directions from map</p>
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

export default DriverSignUp
    // apiKey: ("AIzaSyC99a4WKQbNk19HUyitwVuUJy-ykZco-CM")
  