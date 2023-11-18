import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Card, Label, Select, TextInput } from 'flowbite-react';

const Register = () => {
    const [username, setUsername] = useState("");
    const [userpassword, setPassword] = useState("");
    const [userrole, setRole] = useState("");
    const [useraccess, setAccess] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setError(null);
      }, 5000);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [error]);

    function getCurrentDateFormatted() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
    
      return formattedDate;
    }
    const formattedDate = getCurrentDateFormatted();
    
    const submitForm = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.postForm('Users',{
          userName: username,
          userPassword: userpassword,
          userRole: userrole,
          userAccess: useraccess,
          dateCreated: formattedDate
        });
  
        if (response.data && response.data.redirect && response.data.messages && response.data.messages.success) {
          console.log(response.data.messages.success);
          // redirect user to login page if user's authenticated
          sessionStorage.setItem('Registered',true);
          window.location.href = response.data.redirect;
        }
      } catch(error) {
        setError(error.message);
      }
    }
    return (
    <>
      <div className="flex items-center justify-center h-screen text-center">
          <Card className="w-96">
            <div className="p-4 border-solid">
              <h2 className="text-lg font-semibold">REGISTER</h2>
            </div>
            <form onSubmit={submitForm} className="flex max-w-md flex-col gap-1">
                <Label htmlFor="username">Username:</Label>
                <TextInput
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete=""
                />
                <Label htmlFor="password">Password:</Label>
                <TextInput
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={userpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete=""
                />
                <Label htmlFor="userrole">Role:</Label>
                <Select
                  id="userrole"
                  name="userrole"
                  value={userrole}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="" disabled>Select user role</option>
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </Select>
                <Label htmlFor='useraccess'>Accesibility:</Label>
                <Select
                  id="useraccess"
                  name="useraccess"
                  value={useraccess}
                  onChange={(e) => setAccess(e.target.value)}
                  required
                >
                  <option value="" disabled>Select user access</option>
                  <option value="FULL">Full Access</option>
                  <option value="LIMITED">Limited Access</option>
                  <option value="TEMPORARY">Temporary Access</option>
                </Select><br/>
                <Button type="submit">Register</Button>
            </form>
            <Link to="/login" className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2">Go Back</Link>
            {error && <p style={{ color: 'red' }}>{error}. Try Again.</p>}<br/>
          </Card>
      </div>
    </>
  );
};

export default Register;
