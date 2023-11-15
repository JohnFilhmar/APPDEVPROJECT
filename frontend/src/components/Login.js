import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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
                  <h3 className="text-center">Login</h3>
                  </div>
                  <div className="card-body">
                  <form onSubmit={ submitForm }>
                      <div className="form-group">
                      <label htmlFor="username">Email address:</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter Username"
                        value={ username }
                        onChange={ (e) => setUsername(e.target.value) }
                      />
                      </div>
                      <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Enter Password"
                        value={ userpassword }
                        onChange={ (e) => setPassword(e.target.value) }
                        minLength={8}
                      />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">Login</button>
                      {/* {error && <p style={{ color: 'red' }}>Error: {error.message}</p>} */}
                    </form><br />
                    <Link to="/register"><button className="btn btn-secondary btn-block">Register</button></Link>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  </div>
              </div>
              </div>
          </div>
      </>
  );
};

export default Login;
