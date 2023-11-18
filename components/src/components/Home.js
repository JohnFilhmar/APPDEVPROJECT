import Link from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from 'flowbite-react';

const Home = () => {
    return (
        <>
            <Navbar fluid rounded>
            <Navbar.Toggle />
            <Navbar.Collapse>
                    <Navbar.Link as={Link} to="/canubingmain" active>
                        CanubingMain
                    </Navbar.Link>
                    <Navbar.Link as={Link} to="/canubing1_2">
                        Canubing1_2
                    </Navbar.Link>
                    <Navbar.Link as={Link} to="/bayanan">
                        Bayanan
                    </Navbar.Link>
                    <Navbar.Link as={Link} to="/malinao">
                        Malinao
                    </Navbar.Link>
            </Navbar.Collapse>
            </Navbar>
        </>
    );
}
 
export default Home;