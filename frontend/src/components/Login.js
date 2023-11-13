import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Table from './Table';

const Login = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setPassword] = useState("");
  const [error, setError] = useState(""); // State variable for error

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
        setError(response.data.messages.error); // Set the error state
      }
    } catch(error) {
      console.error('Error',error);
    }
  }
  // 
// 
// 
//  design na lang dito sa return() div className="" lang baguhin para mabago design galing bootstrap yan. https://react-bootstrap.netlify.app/docs/forms/overview
// 
// 
  // 
  return (
      <>
          <div className="row justify-content-center">
              <div className="col-md-6">
              <div className="card bg-dark text-light">
                  <div className="card-header">
                  <h3 className="text-center">Login<Table /></h3>
                  </div>
                  <div className="card-body">
                  <Form onSubmit={ submitForm }>
                      <Form.Group className="form-group">
                      <Form.Label htmlFor="username">Email address:</Form.Label>
                      <Form.Control 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter username"
                        value={ username }
                        onChange={ (e) => setUsername(e.target.value) }
                      />
                      </Form.Group>
                      <Form.Group className="form-group">
                      <Form.Label htmlFor="password">Password:</Form.Label>
                      <Form.Control 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Enter password"
                        value={ userpassword }
                        onChange={ (e) => setPassword(e.target.value) }
                        minLength={8}
                      />
                      </Form.Group>
                      <Button type="submit" className="btn btn-primary btn-block">Login</Button>
                      {/* {error && <p style={{ color: 'red' }}>Error: {error.message}</p>} */}
                    </Form><br />
                    <Link to="/register"><Button className="btn btn-secondary btn-block">Register</Button></Link>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  </div>
              </div>
              </div>
          </div>
      </>
  );
};

export default Login;
