import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import {Navbar} from 'flowbite-react';


const Home = () => {
    return (
        <>
            <Navbar fluid rounded>
                <Navbar.Brand as={NavLink} to="#">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">JMS BRANCHES</span>
                </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                    <Navbar.Link as={NavLink} to="/canubingmain" active>
                        CanubingMain
                    </Navbar.Link>
                    <Navbar.Link as={NavLink} to="/canubing1_2">
                        Canubing1_2
                    </Navbar.Link>
                    <Navbar.Link as={NavLink} to="/bayanan">
                        Bayanan
                    </Navbar.Link>
                    <Navbar.Link as={NavLink} to="/malinao">
                        Malinao
                    </Navbar.Link>
            </Navbar.Collapse>
            </Navbar>
        </>
    );
}
 
export default Home;