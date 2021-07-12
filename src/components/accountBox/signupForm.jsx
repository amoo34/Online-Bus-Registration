import React, { useContext, useEffect, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  DriverButton,ParentButton,StudentButton
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import DriverSignUp from "../driver"
import {ParentSignUp} from '../parent'
export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [loginState,setLoginState]=useState(null)
  const [SignUpComponent,setSignUpComponent]=useState(null)

  useEffect(()=>{
    if(loginState==="driver"){

      setSignUpComponent(<DriverSignUp/>)

    }else if(loginState==="parent"){
      setSignUpComponent(<ParentSignUp/>)
    }
    else{

    }


  },[loginState])

  return (
    <BoxContainer>
      <FormContainer>
     
      {loginState?
        SignUpComponent
      :
      <>
      <h4 className="text-center">Select Your Role Type</h4> <br />
      <div className="row mb-4">
        <div className="col-md-6 text-center mb-3">
          <button style={{width:'70%'}}  className="btn btn-outline-info" onClick={()=>setLoginState("driver")}>Bus Registration</button> 
        </div>

        <div className="col-md-6 text-center">
          <button  style={{width:'70%'}}  className="btn btn-outline-danger" onClick={()=>setLoginState("parent")}>Parental Control</button> 
        </div>

        {/* <div className="col-md-4 text-center">
          <button  className="btn btn-outline-success" onClick={()=>setLoginState("student")}>Student Registration</button> 
        </div> */}
      </div>
      </>
    }
      </FormContainer>
      {/* <Marginer direction="vertical" margin={10} /> */}
      {/* <SubmitButton type="submit">Signup</SubmitButton> */}
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
