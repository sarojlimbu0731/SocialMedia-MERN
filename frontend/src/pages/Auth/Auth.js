import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch, useSelector} from 'react-redux';
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
    console.log(loading);

  const [confirmpass,setConfirmpass]= useState(true)
  const [isSignup, setSignup] = useState(true);
  const [data, setData]= useState({
    firstname:"",
    lastname:"",
    username:"",
    password:"",
    cpassword:""

  })


  const handleChange= (e)=>{
    setData({...data, [e.target.name]:e.target.value})
  }

  const handleSubmit= (e)=>{
    e.preventDefault();

    if (isSignup){
      data.password=== data.cpassword ? dispatch(signUp(data)):setConfirmpass(false)
    }
    else{
      dispatch(logIn(data))
    }
  }

  const resetForm= () =>{
    setConfirmpass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      cpassword: "",
    });
  }

  return (
    <div className='Auth'>
      {/* left side */}
      <div className='a-Left'>
        <img src={Logo} alt='logo' />
        <div className='Webname'>
          <h1>Drop Media</h1>
          <h6>Explore the people around the World</h6>
        </div>
      </div>
      {/* right side */}
      <div className='a-right'>
        <form className='infoForm authForm' onSubmit={handleSubmit}>
          <h1>{isSignup ? "Sign Up" : "Log In"}</h1>
          {isSignup && (
            <div>
              <input
                type='text'
                placeholder='First Name'
                className='infoInput'
                name='firstname'
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type='text'
                placeholder='Last Name'
                className='infoInput'
                name='lastname'
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type='email'
              name='username'
              placeholder='UserName'
              className='infoInput'
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              className='infoInput'
              onChange={handleChange}
              value={data.password}
            />
            {isSignup && (
              <input
                type='password'
                name='cpassword'
                placeholder='Confirm Password'
                className='infoInput'
                onChange={handleChange}
                value={data.cpassword}
              />
            )}
          </div>
          <div>
            <span
              style={{
                display: confirmpass ? "none" : "block",
                color:"red",
              }}
            >
              #password is not same.
            </span>
          </div>
          <div>
            {isSignup ? (
              <span>
                Already have an Account:
                <strong
                  style={{ cursor: "pointer" }}
                  onClick={() => {setSignup(!isSignup);resetForm()}}
                >
                  Log In!
                </strong>
              </span>
            ) : (
              <span>
                Create your Account:
                <strong
                  style={{ cursor: "pointer" }}
                  onClick={() => {setSignup(!isSignup); resetForm()}}
                >
                  Sign Up!
                </strong>
              </span>
            )}
          </div>
          <button className='button info-button' type='submit' disabled={loading}>
           {loading ? "Loading...":isSignup ? " Signup" : "LogIn" } 
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
