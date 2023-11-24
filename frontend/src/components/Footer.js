import { Footer } from 'flowbite-react';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Foot = () => {
    return (
        <>
            <Footer container>
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                <div>
                    <Footer.Brand
                    as={Link}
                    href="#"
                    src="http://localhost:8080/jms.png"
                    alt="JMS Logo"
                    name="Multi-Hub System"
                    style={{position:"static", width:'7vw',height:'7vh'}}
                    />
                </div>
                <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                    <Footer.Title title="about" />
                    <Footer.LinkGroup col>
                        <Footer.Link as={Link} to="#">Canubing I Main Branch</Footer.Link>
                        <Footer.Link as={Link} to="/Canubing1_2">Canubing I.2 Branch</Footer.Link>
                        <Footer.Link as={Link} to="/Bayanan">Bayanan II Branch</Footer.Link>
                        <Footer.Link as={Link} to="#">Malinao Branch</Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title="Follow us" />
                    <Footer.LinkGroup col>
                        <Footer.Link href="https://www.facebook.com/JoemarMotorpartsAndServices" target="_blank">Facebook</Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title="Legal" />
                    <Footer.LinkGroup col>
                        <Footer.Link as={Link} to="#">Privacy Policy</Footer.Link>
                        <Footer.Link as={Link} to="#">Terms &amp; Conditions</Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright as={Link} to="#" by="AmpelDev™" year={2023} />
                <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                    <Footer.Icon as={Link} href="https://www.facebook.com/JoemarMotorpartsAndServices" target="_blank" icon={BsFacebook} />
                    <Footer.Icon as={Link} href="https://github.com/JohnFilhmar" target="_blank" icon={BsGithub} />
                </div>
                </div>
            </div>
            </Footer>
        </>
    );
}
 
export default Foot;