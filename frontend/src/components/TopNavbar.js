import { DarkThemeToggle, Flowbite, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const TopNavbar = () => {
    return (
        <>
            <Navbar>
                <Navbar.Brand as={Link} to="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">JMS Multi-Hub System</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link to="/" active>Home</Navbar.Link>
                    <Navbar.Link as={Link} to="#">About</Navbar.Link>
                    <Navbar.Link to="/">Services</Navbar.Link>
                    <Navbar.Link to="/">Pricing</Navbar.Link>
                    <Navbar.Link to="/">Contact</Navbar.Link>
                    <Flowbite><DarkThemeToggle/></Flowbite>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
 
export default TopNavbar;