import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const profilePictureInputRef = useRef();

  const changeAuthTypeHandler = () => {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    
    let url;
    let method;
    let userAuthInfo;
    if (isLogin) {
      // set url for logging in
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_WEB_API_KEY}`;
      method = 'PUT';
      // login info
      userAuthInfo = {}

    } else {
      // set url for creating new account
      url = `http://localhost:5000/api/users`;
      method = 'POST';
      userAuthInfo = {
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
        firstName: enteredFirstName,
        lastName: enteredLastName
      }
    }


    fetch(url, {
      method,
      body: JSON.stringify(userAuthInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          let errorMessage = data.message;
          throw new Error(errorMessage);
        });
      } else {
        return response.json();
      }
    })
    .then((data) => {
      history.replace('/profile');
    })
    .catch((error) => {
      alert(error.message);
    });

  }

  let mainCredentials;
  let userInfo;
  if (!isLogin) {
    mainCredentials = (
      <React.Fragment>
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' required ref={usernameInputRef}></input>
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef}></input>
        </div>
      </React.Fragment>
    );

    userInfo = (
      <React.Fragment>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' required ref={firstNameInputRef}></input>
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' required ref={lastNameInputRef}></input>
        </div>
      </React.Fragment>
    );

  } else {
    mainCredentials = (
      <div>
        <label htmlFor='username'>Username or Email</label>
        <input type='text' id='username' required ref={usernameInputRef}></input>
    </div>
    );
  }

  return (
    <section>
      <h1>Welcome to Family Finance</h1>
      <form onSubmit={submitHandler}>
        {mainCredentials}
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required ref={passwordInputRef}></input>
        </div>
        {!isLogin && userInfo}
        <button>{isLogin ? 'Login' : 'Create Account'}</button>
        <button
          type='button'
          onClick={changeAuthTypeHandler}>
          {isLogin ? 'Create New Account' : 'Login With Existing Account'}
        </button>
      </form>
    </section>
  );
};

export default AuthForm;