import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  opacity:0.85
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 11px;
  color: rgb(26,54,55,45);
  font-weight: bold;
  text-decoration: none;
  margin-bottom:1em;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  font-size: 12px;
  margin-bottom:5%;

  &::placeholder {
    color: rgba(26,54,55,45);
  }

 

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(26,54,55,45);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  
  background: linear-gradient( 
    58deg
    , rgba(26,54,55,45) 70%, rgba(233,1,83,13) 100% );

  &:hover {
    filter: brightness(1.03);
  }
`;


export const DriverButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background-color: #f2cf07;
background-image: linear-gradient(315deg, #f2cf07 0%, #55d284 74%);

  &:hover {
    filter: brightness(1.03);
  }
`;

export const ParentButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background-color #bd4f6c;
background-image linear-gradient(326deg, #bd4f6c 0%, #d7816a 74%);


  &:hover {
    filter: brightness(1.03);
  }
`;

export const StudentButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
    
  background-color: #21d190;
  background-image: linear-gradient(315deg, #21d190 0%, #d65bca 74%);


  &:hover {
    filter: brightness(1.03);
  }
`;