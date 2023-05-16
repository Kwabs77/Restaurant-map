import Airtable from "airtable";
import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../assests/Login.jpg";
import { Context } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiShow, BiHide } from "react-icons/bi";

const Login: React.FC = () => {
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
  const history = useNavigate();
  const context = useContext(Context);
  const { location, setLocation } = context;
  const name: any = useRef();
  const email: any = useRef();
  const pass: any = useRef();
  const localUSer = window.localStorage.getItem("username");
  const localPass = window.localStorage.getItem("password");
  const [show, setShow] = useState(false);

  let base = new Airtable({ apiKey: "key3Eh1zQy7lHNUoW" }).base(
    "appuf4PguTkzP8Bqc"
  );
  useEffect(() => {
    base("Projects")
      .select({ view: "Grid view" })
      .eachPage((records: any, fetchNextPage) => {
        setApiUSer(records);
        fetchNextPage();
      });
  }, []);

  for (let i = 0; i < apiUser.length; i++) {
    arr[apiUser[i].fields.username] = apiUser[i].fields.password;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let string = username.toString();

    if (arr[string] === password) {
      toast.success("Login Successful ");
      history("/home");
      window.localStorage.setItem("username", string);
      window.localStorage.setItem("password", password);
    } else if (
      email.current.value === localUSer &&
      pass.current.value === localPass
    ) {
      toast.success("Login Successful");
      history("/home");
    } else {
      toast.error("Credentials does not match");
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  //console.log(location);

  return (
    <div className="containerLogin">
      <div className="image">
        <img src={login} />
      </div>
      <div className="box">
        <div className="color">
          <div className="login">
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="input1"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                ref={email}
                required
              />
              <br />
              <input
                type={!show ? "password" : "text"}
                value={password}
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                ref={pass}
                required
              />
              <label onClick={handleShow}>
                {" "}
                {!show ? <BiShow size={20} /> : <BiHide size={20} />}
              </label>
              <br />
              <button type="submit"> Login </button>
            </form>

            <p>
              Don't have an account? <Link to="signUp"> Sign Up </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
