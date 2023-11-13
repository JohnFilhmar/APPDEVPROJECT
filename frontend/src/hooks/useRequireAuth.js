import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useRequireAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('Users');
        if (response.status === 200) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          history.push('/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setLoggedIn(false);
        history.push('/login');
      }
    };
    checkAuthentication();
  }, [history]); 

  return isLoggedIn;
};

export default useRequireAuth;
