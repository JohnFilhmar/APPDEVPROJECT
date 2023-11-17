import axios from 'axios';
import { Navbar,Alert } from 'flowbite-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const TopNavbar = () => {
    const [message,setMessage] = useState("");

    const logout = async (e) => {
        try{
            const response = await axios.get('logout');
            console.log(response);
            if(response.data.redirect){
                console.log(response)
                window.location.href = response.data.redirect;
            } else {
                setMessage("Something may have gone wrong");
            }
        }catch(error){
            console.error('Logout error:', error);
            setMessage('An error occurred during logout');
        }
    };
    
    
    return (
        <>
            <Navbar className='sticky top-0'>
                <Navbar.Brand as={NavLink} to="/">
                    <img src="jms.png" className="mr-3 w-7 sm:w-10 md:w-15 lg:w-20 h-7 sm:h-10 md:h-15 lg:h-20" alt="Flowbite React Logo"/>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Multi-Hub System</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link as={NavLink} to="/" active>Dashboard</Navbar.Link>
                    <Navbar.Link as={NavLink} to="/ecomm">E-Shop</Navbar.Link>
                    <Navbar.Link as={NavLink} to="/messaging">Messaging</Navbar.Link>
                    <Navbar.Link as={NavLink} to="/">Pricing</Navbar.Link>
                    <Navbar.Link as={NavLink} to="#" onClick={logout} style={{color: 'red'}}>Logout</Navbar.Link>   
                </Navbar.Collapse>
            </Navbar>
            { message && <Alert color="info"><span className="font-medium">{message}</span></Alert>}
        </>
    );
}
 
export default TopNavbar;