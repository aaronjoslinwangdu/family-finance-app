import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import classes from '../Expenses/ExpenseForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);

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
    
    let url; 
    let userAuthInfo;

    if (isLogin) {
      url = 'http://localhost:5000/api/users/login';
      userAuthInfo = {
        email: enteredEmail,
        password: enteredPassword
      }
    } else {
      const enteredUsername = usernameInputRef.current.value;
      const enteredFirstName = firstNameInputRef.current.value;
      const enteredLastName = lastNameInputRef.current.value;
      url = 'http://localhost:5000/api/users';
      userAuthInfo = {
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
        firstName: enteredFirstName,
        lastName: enteredLastName
      }
    }


    fetch(url, {
      method: 'POST',
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
      localStorage.setItem('accessToken', data.accessToken);
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
        <div className={classes.inputSubsection}>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' required ref={usernameInputRef}></input>
        </div>
        <div className={classes.inputSubsection}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef}></input>
        </div>
      </React.Fragment>
    );

    userInfo = (
      <React.Fragment>
        <div className={classes.inputSubsection}>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' required ref={firstNameInputRef}></input>
        </div>
        <div className={classes.inputSubsection}>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' required ref={lastNameInputRef}></input>
        </div>
      </React.Fragment>
    );

  } else {
    mainCredentials = (
      <div className={classes.inputSubsection}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' required ref={emailInputRef}></input>
    </div>
    );
  }

  return (
    <section>
      <h1>Welcome to Family Finance</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.inputSection}>
          {mainCredentials}
          <div className={classes.inputSubsection}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' required ref={passwordInputRef}></input>
          </div>
          {!isLogin && userInfo}
        </div>
        <div className={classes.buttonSection}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            onClick={changeAuthTypeHandler}>
            {isLogin ? 'Create New Account' : 'Login With Existing Account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;