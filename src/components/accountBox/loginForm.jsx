import React, { useEffect,useContext,useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import {Driver} from '../driver/Login';
import {Driver1} from '../driver1/Login'
import {Student} from '../student/Login';
import {Parent} from '../parent/Login';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const { switchToSignin } = useContext(AccountContext);
  const [loginState,setLoginState]=useState(null)
  const [SignUpComponent,setSignUpComponent]=useState(null)

  useEffect(()=>{
    if(loginState==="driver"){

      setSignUpComponent(<Driver/>)

    }else if(loginState==="parent"){
      setSignUpComponent(<Parent/>)
    }
    else if(loginState==="driver1"){
      setSignUpComponent(<Driver1/>)
    }
    else{
      setSignUpComponent(<Student/>)

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
          <div className="col-md-4 text-center mb-3">
            <button style={{width:'70%'}} className="btn btn-outline-info" onClick={()=>setLoginState("driver")}>Bus CheckIn</button> 
          </div>

          <div className="col-md-4 text-center mb-3">
            <button  style={{width:'70%'}}  className="btn btn-outline-danger" onClick={()=>setLoginState("parent")}>Parental CheckIn</button> 
          </div>

          <div className="col-md-4 text-center">
            <button   style={{width:'70%'}} className="btn btn-outline-success" onClick={()=>setLoginState("student")}>Student CheckIn</button> 
          </div>

          <div className="col-md-4 text-center">
            <button   style={{width:'70%'}} className="btn btn-outline-success" onClick={()=>setLoginState("driver1")}>Driver1 CheckIn</button> 
          </div>
        </div>
        </>
      }
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {/* <MutedLink href="#">Forget your password?</MutedLink> */}
      <Marginer direction="vertical" margin="1.6em" />
      
      {/* <SubmitButton type="submit" onClick={signInHandler}>Signin</SubmitButton> */}
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
