import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Card, Label, TextInput } from 'flowbite-react';

const Login = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.postForm('login', {
        userName: username,
        userPassword: userpassword,
      });

      if (response.data && response.data.redirect && response.data.messages && response.data.messages.success) {
        console.log('Login successful:', response.data.messages.success);
        window.location.href = response.data.redirect;
      } else if (response.data && response.data.messages && response.data.messages.error) {
        setError(response.data.messages.error);
      }
    } catch(error) {
      console.error('Error',error);
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
              <Label htmlFor="username">Email address:</Label>
              <TextInput 
                type="text" 
                className="form-control" 
                id="username" 
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
              />
              </div>
              <Button type="submit">Login</Button>
            </form>
            <Link to="/register" className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2">Register</Link>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </Card>
        </div>
      </>
  );
};

export default Login;
