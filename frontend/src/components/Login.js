import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Card, Label, TextInput } from 'flowbite-react';

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [userpassword, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(localStorage.getItem('Registered'));

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRegistrationSuccess(false);
      localStorage.removeItem('Registered');
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [registrationSuccess]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.postForm('login', {
        userName: username,
        userPassword: userpassword,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token',response.data.token);
      }

      if (response.data && response.data.userId) {
        localStorage.setItem('isLoggedIn',true);
        localStorage.setItem('userId', response.data.userId);
      }

      if (response.data && response.data.role) {
        localStorage.setItem('role', response.data.role);
      }

      if (response.data && response.data.redirect) 
      {
        localStorage.setItem('username',username);
        history.push(response.data.redirect);
      } else if (response.data && response.data.messages && response.data.messages.error){
        setError(response.data.messages.error);
      }
    } catch(error) {
      setError(error.message)
    }
  }
  return (
      <>
        <div className="flex items-center justify-center h-screen text-center">
          <Card className="w-96">
            <div className="p-4 border-solid">
              <h2 className="text-lg font-semibold">LOGIN</h2>
            </div>
            <form onSubmit={ submitForm } className="flex max-w-md flex-col gap-4">
              <div>
              <Label htmlFor="username">Username:</Label>
              <TextInput 
                type="text" 
                className="form-control" 
                id="username" 
                autoComplete='true'
                placeholder="Enter Username"
                value={ username }
                onChange={ (e) => setUsername(e.target.value) }
                required
              />
              </div>
              <div>
              <Label htmlFor="password">Password:</Label>
              <TextInput
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Enter Password"
                value={ userpassword }
                onChange={ (e) => setPassword(e.target.value) }
                minLength={8}
                required
                autoComplete='true'
              />
              </div>
              <Button type="submit">Login</Button>
            </form>
            <Link to="/register" className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2">Register</Link>
            {localStorage.getItem('Registered') && registrationSuccess && <p style={{color:'green'}}>"Registration Successful"</p>}
            {error && <p style={{ color: 'red' }}>{error}. Try Again.</p>}
          </Card>
        </div>
      </>
  );
};

export default Login;
