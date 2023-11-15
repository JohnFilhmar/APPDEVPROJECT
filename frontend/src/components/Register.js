import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Register = () => {
    const [username, setUsername] = useState("");
    const [userpassword, setPassword] = useState("");
    const [userrole, setRole] = useState("");
    const [useraccess, setAccess] = useState("");
    const [error, setError] = useState(null);
    
    // handle form submition
    const submitForm = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.postForm('Users',{
          userName: username,
          userPassword: userpassword,
          userRole: userrole,
          userAccess: useraccess,
        });
  
        if (response.data && response.data.redirect && response.data.messages && response.data.messages.success) {
          console.log(response.data.messages.success);
          // redirect user to login page if user's authenticated
          window.location.href = response.data.redirect;
        } else if (response.data && response.data.messages && response.data.messages.error) {
          // Set the error state
          setError(response.data.messages.error); 
        }
      } catch(error) {
        console.error('Error',error);
      }
    }
    return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-light">
            <div className="card-header">
              <h3 className="text-center">Register</h3>
            </div>
            <div className="card-body">
                <form onSubmit={submitForm}>
                    <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={userpassword}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="userrole">User Role:</label>
                    <input
                        type="text"
                        name="userrole"
                        className="form-control"
                        id="userrole"
                        placeholder="Enter user role"
                        value={userrole}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="useraccess">User Access:</label>
                    <input
                        type="text"
                        name="useraccess"
                        className="form-control"
                        id="useraccess"
                        placeholder="Enter user access"
                        value={useraccess}
                        onChange={(e) => setAccess(e.target.value)}
                    />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                    Register
                    </button>
                </form><br />
                <Link to="/login"><button className="btn btn-secondary btn-block">Go back to login</button></Link>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
