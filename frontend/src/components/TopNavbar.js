import axios from 'axios';
import { Navbar,Alert,Dropdown, Button, Modal, Badge } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { LiaCartPlusSolid } from "react-icons/lia";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const TopNavbar = () => {
    const [openModal, setOpenModal] = useState(false);
    const [warningModal, setWarningModal] = useState(false);
    const [message,setMessage] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const uniqueItemNames = Array.from(new Set(cartItems.map(item => item.itemname)));

    useEffect(() => {
        const cartFromLocalStorage = localStorage.getItem('cart');
        const cartArray = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
        setCartItems(prevCartItems => {
          // Use a callback to avoid infinite loop
          if (JSON.stringify(prevCartItems) !== JSON.stringify(cartArray)) {
            return cartArray;
          }
          return prevCartItems;
        });
        setCartCount(cartArray.length);
      }, [openModal,cartItems]);

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const logout = async (e) => {
        try {
            const response = await axios.get('logout');
            console.log(response);
            if (response.data.redirect) {
              sessionStorage.setItem('isLoggedIn', false);
              sessionStorage.removeItem('username');
              sessionStorage.removeItem('accessibility');
              window.location.href = response.data.redirect;
            } else {
              setMessage('Something may have gone wrong');
            }
        } catch (error) {
            console.error('Logout error:', error);
            setMessage('An error occurred during logout');
        }
    };
    
    const ClearCart = () => {
        localStorage.removeItem('cart');
        setCartItems([]);
        setWarningModal(false);
    }

    const clearWarning =() => {
        setOpenModal(false);
        setWarningModal(true);
    }

    return (
        <>
            <Navbar className='sticky top-0 z-50'>
                <Navbar.Brand as={NavLink} to="/">
                    <img src="http://localhost:8080/jms.png" className="mr-3 w-7 sm:w-10 md:w-15 lg:w-20 h-7 sm:h-10 md:h-15 lg:h-20" alt="JMS"/>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Multi-Hub System</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link as={NavLink} to="/dashboard" active>Dashboard</Navbar.Link>
                    <Navbar.Link as={NavLink} to="/ecomm">E-Shop</Navbar.Link>
                    <Navbar.Link as={NavLink} to="/messaging">Messaging</Navbar.Link>
                    <Navbar.Link as={NavLink} to="/">Pricing</Navbar.Link>
                    <Navbar.Link
                        onClick={() => setOpenModal(true)}
                        className="relative flex items-center"
                        style={{cursor:'pointer'}}
                    >
                        <LiaCartPlusSolid style={{ width: '20px', height: '20px' }} />
                        <span className="ml-1">Cart</span>
                        {cartCount > 0 && (
                        <Badge
                            color="warning"
                            className="absolut top-0 left-0 lg:absolute lg:top-0 lg:left-10 transform translate-x-1/2 -translate-y-1/2"
                        >
                            {cartCount}
                        </Badge>
                        )}
                    </Navbar.Link>
                    <Navbar.Link> 
                        <Dropdown label={`Welcome ${sessionStorage.getItem('username')}`} inline>
                            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item onClick={logout} style={{color: 'red'}}>Sign out</Dropdown.Item>
                        </Dropdown>
                    </Navbar.Link>
                </Navbar.Collapse>
            { message && <Alert color="info"><span className="font-medium">{message}</span></Alert>}
            </Navbar>
            <Modal show={openModal} size='4xl' onClose={() => setOpenModal(false)}>
                <Modal.Header>Cart</Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-4">
                        {cartItems.length > 0 ? (
                            uniqueItemNames.map(itemName => {
                                const sameItems = cartItems.filter(cartItem => cartItem.itemname === itemName);
                                const totalQuantity = sameItems.reduce((total, cartItem) => total + parseInt(cartItem.quantity || 1, 10), 0);
                                const totalPrice = sameItems.reduce((total, cartItem) => total + parseFloat(cartItem.sellingprice), 0);
                              
                                const item = sameItems[0]; // Take the first item for other details
                              
                                return (
                                    <div key={item.id}>
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                            <div className="flex justify-between items-center mb-2">
                                                <h2 className="text-xl font-semibold">
                                                {itemName} {totalQuantity > 1 ? `(${totalQuantity})` : ''}
                                                </h2>
                                                <Button
                                                color="failure"
                                                onClick={() => removeFromCart(item.id)}
                                                >
                                                Remove
                                                </Button>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 mb-2">
                                                    <span className="font-semibold">Category:</span> {item.category}
                                                </p>
                                                <p className="text-gray-600 mb-2">
                                                    <span className="font-semibold">Compatibility:</span> {item.compatibility}
                                                </p>
                                                <p className="text-gray-600 mb-2">
                                                    <span className="font-semibold">Total Price:</span> ₱{totalPrice.toFixed(2)}
                                                </p>
                                                <p className="text-gray-600 mb-2">
                                                    <span className="font-semibold">Branch:</span> {item.branch}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <Alert color="success">
                              <span className="font-medium">Cart Empty!</span>
                            </Alert>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-end">
                    <div className='grid grid-cols-3 gap-4'>
                        {cartItems.length > 0 && 
                            <Button color="failure" onClick={() => clearWarning()}>
                                Clear Cart
                            </Button>
                        }
                        <Button color="success" onClick={() => setOpenModal(false)}>Checkout</Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Back
                        </Button>
                    </div>
                    <h1>
                        Total: <span className='font-extrabold'>₱{cartItems.reduce((total, item) => total + parseFloat(item.sellingprice), 0)}</span>
                    </h1>
                </Modal.Footer>
            </Modal>
            <Modal show={warningModal} size="md" onClose={() => setWarningModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to clear your cart?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={() => ClearCart(false)}>
                        {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => setWarningModal(false)}>
                        No, cancel
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
 
export default TopNavbar;