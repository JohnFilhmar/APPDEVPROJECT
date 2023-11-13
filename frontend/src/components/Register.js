import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Register = () => {
    const [username, setUsername] = useState("");
    const [userpassword, setPassword] = useState("");
    const [userrole, setRole] = useState("");
    const [useraccess, setAccess] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    
    const submitForm = async (e) => {
      e.preventDefault();
      await axios.postForm('Users',{
        userName: username,
        userPassword: userpassword,
        userRole: userrole,
        userAccess: useraccess,
      });
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
                <Form onSubmit={submitForm}>
                    <Form.Group className="form-group">
                    <Form.Label htmlFor="username">Username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group className="form-group">
                    <Form.Label htmlFor="password">Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={userpassword}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group className="form-group">
                    <Form.Label htmlFor="userrole">User Role:</Form.Label>
                    <Form.Control
                        type="text"
                        name="userrole"
                        className="form-control"
                        id="userrole"
                        placeholder="Enter user role"
                        value={userrole}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group className="form-group">
                    <Form.Label htmlFor="useraccess">User Access:</Form.Label>
                    <Form.Control
                        type="text"
                        name="useraccess"
                        className="form-control"
                        id="useraccess"
                        placeholder="Enter user access"
                        value={useraccess}
                        onChange={(e) => setAccess(e.target.value)}
                    />
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary btn-block">
                    Register
                    </Button>
                </Form><br />
                <Link to="/login"><Button className="btn btn-secondary btn-block">Go back to login</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;