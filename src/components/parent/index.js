import { ToastContainer, toast } from 'react-toastify';
import {React,useState} from 'react';
import {API} from '../config';


export function ParentSignUp (){
    const [nic,setnic]=useState();
    const [name,setName]=useState();
    const [password,setPassword]=useState();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(nic=="" || name=="" || password==""){
            toast.error("Each field is mandatory",{
                pauseOnHover: true,
                draggable: true,
                hideProgressBar: true,
                closeOnClick: false,
            });
        }else{
            let data={
                nic,name,password
            }
            API.post("parentregister",data)
            .then((res)=>{
                toast.success("Parental Control Registered",{
                    pauseOnHover: true,
                    draggable: true,
                    hideProgressBar: true,
                    closeOnClick: false,
                });
                window.location="/";
            })
            .catch((err)=>{
                console.log(err.response.data.message)
                toast.error(err.response.data.message ,{
                    pauseOnHover: true,
                    draggable: true,
                    hideProgressBar: true,
                    closeOnClick: false,
                });
            })
        }
    }
    
    return(
        <>
        <ToastContainer />

        <form >
            <div className="row mb-3 pl-3 pr-3">
                <div className="col-md-12 text-center ">
                    <h3>Parental Control</h3>
                </div>

                <div className="col-md-6">
                    <input type="text" name="cnic" onChange={(e)=>setnic(e.target.value)} className="form-control"  placeholder="NIC" />
                </div>
                <div className="col-md-6 mt-3">
                    <input type="text" name="name" onChange={(e)=>setName(e.target.value)}  className="form-control"  placeholder="Name"/>
                </div>
                
                <div className="col-md-12">
                    <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}   className="form-control mt-3"  placeholder="password"/>
                </div>
              
                <div className="col-md-12 text-center mt-5">
                    <button className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
          
        </form>
      </>
    )
}