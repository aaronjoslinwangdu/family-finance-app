import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const PrivatePage = (props) => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // check if user is authenticated
  useEffect(() => {

    fetch('http://localhost:5000/api/users/private', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
    .then((res) => {
      if (res.status === 200) {
        setIsAuthenticated(true);
        console.log('auth success')
      } else {
        setIsAuthenticated(false);
        console.log('auth fail');
      }
    });
  }, []);

  return (
    <React.Fragment>
      {isAuthenticated && <div>{props.children}</div>}
    </React.Fragment>
  );
};

export default PrivatePage;