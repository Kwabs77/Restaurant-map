import Airtable from "airtable";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assests/Login.jpg";
import { Context } from "../Context";
import {BiShow,BiHide  } from "react-icons/bi";

const SignUp: React.FC = () => {
  interface api {
    fields: {
      username: string;
      password: string;
      id: string;
    };
  }

  const [apiUser, setApiUSer] = useState<any>([]);
  const arr: any = [];
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [naming, setNaming] = useState<string>("");
  const history = useNavigate();
  const context = useContext(Context);
  const { location, setLocation } = context;
  const name: any = useRef();
  const email: any = useRef();
  const pass: any = useRef();
  const [show, setShow]=useState(false)
  
   let localSiignUp = window.localStorage.getItem('signUp')
     useEffect(()=>{
        if(localSiignUp){
            history("/home");
        }
  },[])
  const handleShow=()=>{
    setShow(!show)
   }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let string = username.toString();
    if (name.current.value && email.current.value && pass.current.value) {
      window.localStorage.setItem("name", name.current.value);
      window.localStorage.setItem("email", email.current.value);
      window.localStorage.setItem('pass',pass.current.value)
      window.localStorage.setItem("signUp", email.current.value);
      window.location.reload();
    }
  
  };
  //console.log(location);

  return (
    <div className="containerLogin">
      <div className="image">
        <img src={login} />
      </div>
      <div className="box">
      <div className="login">
        <h1> Sign Up </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input1"
            value={naming}
            placeholder="Enter your Name"
            onChange={(e) => {
              setNaming(e.target.value);
            }}
            ref={name}
            required
          />
          <br />
          <input
            type="text"
            className="input1"
            value={username}
            placeholder="Enter your username or email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            ref={email}
            required
          />
          <br />
          <input
            type={!show?"password":"text"}
            value={password}
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            ref={pass}
            required
          />
          <label onClick={handleShow}> {!show?<BiShow size={20}/>:<BiHide size={20}/>}</label>

          <br />
          <button type="submit"> Sign Up </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default SignUp;












/*

window.addEventListener('load',()=>{

  const name= document.querySelector('#name');
  const username = localStorage.getItem('username') || '';

  name.value = username;

  name.addEventListener('change', (e)=>{
    localStorage.setItem('username', e.target.value);
  })

})





*/