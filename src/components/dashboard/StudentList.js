import {React,useState,useEffect} from 'react';
import L from 'leaflet';
import Header from "./header"
import { ToastContainer, toast } from 'react-toastify';
import {API} from '../config'


export default function StudentList(){

    const [regNumber,setRegNumber]=useState("");
    const [student,setStudents]=useState([]);
    const [isfee,setisfee]=useState("");
    const [id,setId]=useState(null);
    const [edit,setEdit]=useState(false)
    useEffect(()=>{
        getStudents()
    },[])

    const getStudents=()=>{
        API.get("getStudentByNic/"+sessionStorage.getItem("nic"))
        .then((res)=>{
            setStudents(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handelSubmit=(e)=>{
        e.preventDefault();
        if(regNumber==""  || isfee=="" ){
            toast.error("all fields are mandatory");
        }else{
            let data={
                regNumber,isfee
            }
            API.post("update/"+id,data)
            .then((res)=>{
                toast.success("Student updated Successfully");
                setisfee("")
                setRegNumber("")
                setEdit(false);
                getStudents()
            })
            .catch((err)=>{
                toast.error(err.response.data.message)
            })

        }
    }

    const editStudent=(id,reg,isfee)=>{
        setEdit(true);
        setRegNumber(reg);
        setisfee(isfee)
        setId(id)
    }

    const deleteStudent=(id)=>{
        API.post("deleteStudent/"+id)
        .then((res)=>{
            toast.success("Delete Successfully")
            getStudents()
        })
        .catch((err)=>{toast.error("can not be delete this moment")})
    }

    return(
        <>
        <ToastContainer />

        <Header/>   
        <div className="row">
            <div className="offset-md-3 col-md-6">
                <div className="row text-center mt-5 pt-4 pl-2 pr-2">
                    {edit ? 
                        <>
                        <div className="col-md-12 text-center mt-4 mb-4">
                           <h3>
                               Update Student Record
                               </h3> 
                        </div>
                        <div className="offset-md-2 col-md-8 mb-2">
                            <input type="text" className="form-control" onChange={(e)=>setRegNumber(e.target.value)} value={regNumber} name="reg" placeholder="Student Registration#" />
                        </div><br />
    
                        <div className="offset-md-2 col-md-8 mt-3 mb-2">
                            <select name="fee" id=""  onChange={(e)=>setisfee(e.target.value)} value={isfee} className="form-control">
                                <option value="">IS FEE PAID</option>
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                            </select>
                        </div><br />
                        <div className="col-md-12 text-center mt-5">
                            <input className="btn btn-outline-primary" onClick={handelSubmit} type="submit"  value="submit" />
                        </div>
                        </>
               


                    :
                    <>
                    <div className="col-md-12 text-center mt-4 mb-4">
                          
                       <h3>
                           Student List
                           </h3> 
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <tr>
                                <th>Registration #</th>
                                <th>Is Fee</th>
                                <th>Action</th>
                            </tr>
                                {student.map((student)=>{
                                return(
                                <tr>
                                        <td>{student.regNumber}</td>
                                <td>{student.isfee}</td>
                                <td>
                                    <button className="btn " onClick={()=>editStudent(student._id,student.regNumber,student.isfee)}><span class="fa fa-pencil"></span></button>
                                    <button className="btn " onClick={()=>deleteStudent(student._id)}><span class="fa fa-trash"></span></button>
                                </td>
                                </tr>
                                    
                                    )
                                })}
                        </table>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
        </>
    )
}