import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { IoKey } from "react-icons/io5";

const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [KeyVisibility, setKeyVisibility] = useState(false);
    const [userpassword, setPassword] = useState("");
    const [secretkey, setSecretKey] = useState("NOVALUE");
    const [error, setError] = useState(null);
    const [prevent, setPrevent] = useState(true);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setError(null);
      }, 5000);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [error]);
    
    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      setPassword(newPassword);
      if (!passwordRegex.test(newPassword) && newPassword !== '') {
        setPrevent(true);
        setError('Password must include at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and be at least 8 characters long.');
      } else {
        setPrevent(false);
        setError(null);
      }
    };

    const submitForm = async (e) => {
      e.preventDefault();
      if(!prevent){
        try {
          const response = await axios.postForm('createUser',{
            userName: username,
            userPassword: userpassword,
            userRole: secretkey,
          });
          if (response.data && response.data.redirect && response.data.messages && response.data.messages.success) {
            console.log(response.data.messages.success);
            localStorage.setItem('Registered',true);
            history.push(response.data.redirect);
          }
          if (response.data && response.data.fail) {
            setError(response.data.fail);
          }
        } catch(error) {
          setError(error.message);
        }
      } else {
        setError('Password must include at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and be at least 8 characters long.');
      }
    }
    return (
    <>
      <div className="flex items-center justify-center h-screen text-center">
          <Card className="w-96">
            <div className="flex justify-end">
              <IoKey 
                className={`w-7 h-7 border-2 rounded-lg ${(KeyVisibility)? 'border-gray-900 bg-gray-900 text-gray-400' : 'border-gray-500 bg-gray-500 text-gray-800'}`}
                onClick={() => setKeyVisibility(!KeyVisibility)}
              />
            </div>
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
                    autoComplete="true"
                />
                <Label htmlFor="password">Password:</Label>
                <TextInput
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={userpassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  autoComplete="true"
                />
                <div className={((KeyVisibility)? "block" : "hidden")}>
                  <Label htmlFor="secretkey">Secret Key:</Label>
                  <TextInput
                      type="password"
                      name="secretkey"
                      className="form-control mb-2"
                      id="secretkey"
                      placeholder="Enter secretkey"
                      value={secretkey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      required
                      autoComplete="true"
                  />
                </div>
                <Button className='mt-5' type="submit">Register</Button>
            </form>
            <Link to="/login" className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2">Go Back</Link>
            {error && <p style={{ color: 'red' }}>{error}! Try Again.</p>}<br/>
          </Card>
      </div>
    </>
  );
};

export default Register;
