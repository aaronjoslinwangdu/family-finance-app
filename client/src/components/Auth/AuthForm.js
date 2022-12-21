import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const changeAuthTypeHandler = () => {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // validate email and password here
    // potentially add a new file in libs for validation of fields since we will have to validate first/last name as well

    // do requests to firebase auth next for now
    
    let url;
    if (isLogin) {
      // set url for logging in
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_WEB_API_KEY}`;
    } else {
      // set url for creating new account
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_WEB_API_KEY}`;
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          let errorMessage = 'Authentication Error';
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

  return (
    <section>
      <h1>Welcome to Family Finance</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef}></input>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required ref={passwordInputRef}></input>
        </div>
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