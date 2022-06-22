import React from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';



const Auth = () => {
  return (
    <div className="Auth">
        <div className="a-Left">
        <img src={Logo} alt="logo"/>
        <div className="Webname">
            <h1>Drop Media</h1>
            <h6>Explore the people around the World</h6>
        </div>
        </div>
        {/* <Signup/> */}
        <Login/>
    </div>
  )
}

function Login() {
  return (
    <div className='a-right'>
      <form className='infoForm authForm'>
        <h1>Login</h1>
        <div>
          <input
            type='text'
            name='username'
            placeholder='UserName'
            className='infoInput'
          />
        </div>
        <div>
          <input
            type='text'
            name='password'
            placeholder='Password'
            className='infoInput'
          />
        </div>
        <div>
          <span>Don't have an Account: Signup!</span>
        </div>
        <button className='button info-button' type='submit'>
          LogIn
        </button>
      </form>
    </div>
  );
};

function Signup(){
    return (
      <div className='a-right'>
        <form className='infoForm authForm'>
          <h1>Sign Up</h1>
          <div>
            <input
              type='text'
              placeholder='First Name'
              className='infoInput'
              name='firstname'
            />
            <input
              type='text'
              placeholder='Last Name'
              className='infoInput'
              name='lastname'
            />
          </div>
          <div>
            <input
              type='text'
              name='username'
              placeholder='UserName'
              className='infoInput'
            />
          </div>
          <div>
            <input
              type='text'
              name='password'
              placeholder='Password'
              className='infoInput'
            />
            <input
              type='text'
              name='cpassword'
              placeholder='Confirm Password'
              className='infoInput'
            />
          </div>
          <div>
            <span>Already have an Account: Login!</span>
          </div>
          <button className="button info-button" type="submit">Signup</button>
        </form>
      </div>
    );
}

export default Auth;