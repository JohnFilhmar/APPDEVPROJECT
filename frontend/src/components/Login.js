import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { TiShoppingCart } from "react-icons/ti";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [userpassword, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(localStorage.getItem('Registered'));
  const [message, setMessage] = useState(sessionStorage.getItem('message'));

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      sessionStorage.removeItem('message');
    };
  }, [error]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.postForm('login', {
        userName: username,
        userPassword: userpassword,
      });
      // console.log(response.data.userName);
      if(response.data && response.data.userId){
        localStorage.setItem('userId',response.data.userId);
        localStorage.setItem('isLoggedIn',true);
      } else {
        setError("Something have gone wrong");
      }
      if(response.data && response.data.userName){
        localStorage.setItem('userName',response.data.userName);
      }
      if(response.data && response.data.userEmail){
        localStorage.setItem('userEmail',response.data.userEmail);
      }
      if(response.data && response.data.userRole){
        localStorage.setItem('userRole',response.data.userRole);
      }
      if(response.data && response.data.messages && response.data.messages.error){
        setError(response.data.messages.error);
      }
      if(response.data && response.data.redirect){
        history.push(response.data.redirect);
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
            <Link to="/shop" className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2">
              <TiShoppingCart/>
                Browse for now
              <TiShoppingCart/>
            </Link>
            {localStorage.getItem('Registered') && registrationSuccess && <p style={{color:'green'}}>"Registration Successful"</p>}
            {sessionStorage.getItem('message') && !localStorage.getItem('Registered') && message && <p style={{color:'green'}}>{sessionStorage.getItem('message')}</p>}
            {error && <p style={{ color: 'red' }}>{error}. Try Again.</p>}
          </Card>
        </div>
      </>
  );
};

export default Login;
