import axios from 'axios';
import { Navbar,Alert,Dropdown, Button, Modal, Badge } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { LiaCartPlusSolid } from "react-icons/lia";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaExpandArrowsAlt, FaCompressArrowsAlt } from "react-icons/fa";
import { TiPlus, TiMinus } from "react-icons/ti";
import Messages from './chat/Messages';
import Checkout from './checkout/CheckOut';

const TopNavbar = () => {
    const [openModal, setOpenModal] = useState(false);
    const [warningModal, setWarningModal] = useState(false);
    const [message,setMessage] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [screen, setScreen] = useState(false);
    const [checkOutModal, setCheckOutModal] = useState(false);
    const uniqueItemNames = Array.from(new Set(cartItems.map(item => item.itemname)));

    useEffect(() => {
        const cartFromLocalStorage = localStorage.getItem('cart');
        const cartArray = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
        
        setCartItems(prevCartItems => {
            if (JSON.stringify(prevCartItems) !== JSON.stringify(cartArray)) {
                return cartArray;
            }
            return prevCartItems;
        });
        setCartCount(cartArray.length);
    }, [openModal]);

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const updateQuantity = (itemId, increment) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = parseInt(item.quantity || 1, 10) + increment;
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log("Updated Cart", updatedCart);
        setCartItems(updatedCart);
    };

    const handleCheckout = () => {
        const toCheckOut = localStorage.getItem('cart');
        const cartItems = JSON.parse(toCheckOut);
        const checkedOutItems = toCheckOut && cartItems.map(item => {
            const { id, itemname, sellingprice, quantity } = item;
            const processedItem = { id, itemname, sellingprice, quantity };
            return processedItem;
        });
        localStorage.setItem('toCheckOutItems', JSON.stringify(checkedOutItems));
        // console.log(localStorage.getItem('toCheckOutItems'));
        setCheckOutModal(true);
        setOpenModal(false);
    }

    const logout = async () => {
        setCheckOutModal(false);
        try {
            const response = await axios.post('logoutUser');
            console.log(response);
            if (response.data.redirect) {
              sessionStorage.setItem('isLoggedIn', false);
              sessionStorage.removeItem('userId');
              sessionStorage.removeItem('username');
              sessionStorage.removeItem('role');
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
    const handleFullscreen = () => {
setCheckOutModal(false);
        const element = document.documentElement;
        if(screen === true){
            setScreen(false);
        } else {
            setScreen(true);
        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            element.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        }
    };

    return (
        <>
            <Checkout data = {localStorage.getItem('toCheckOutItems')} state = {checkOutModal}/>
            <Navbar className='sticky top-0 z-50 bg-slate-300'>
                <Navbar.Brand as={NavLink} to="/">
                    <img src="http://localhost:8080/jms.png" className="mr-3 w-7 sm:w-10 md:w-15 lg:w-20 h-7 sm:h-10 md:h-15 lg:h-20" alt="JMS"/>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Multi-Hub System</span>
                </Navbar.Brand>
                <Navbar.Toggle className='ml-12'/>
                <button onClick={handleFullscreen}  className='block md:hidden lg:hidden'>
                    {!screen && <FaExpandArrowsAlt/>}
                    {screen && <FaCompressArrowsAlt/>}
                </button>
                <Navbar.Collapse>
                    <Navbar.Link onClick={() => setCheckOutModal(false)} as={NavLink} to="/dashboard" active>Dashboard</Navbar.Link>
                    <Navbar.Link onClick={() => setCheckOutModal(false)} as={NavLink} to="/ecomm" active>E-Shop</Navbar.Link>
                    <Navbar.Link onClick={() => setCheckOutModal(false)} as={NavLink} to="/transac" active>Transactions</Navbar.Link>
                    <Navbar.Link onClick={() => setCheckOutModal(false)} as={NavLink} to="/userprofiles" active>User Management</Navbar.Link>
                    <Navbar.Link
                        onClick={() => {setCheckOutModal(false);setOpenModal(true);}}
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
                    <Dropdown label={`Welcome ${sessionStorage.getItem('username')}`} inline>
                        <Dropdown.Item onClick={() => setCheckOutModal(false)} as={Link} to="/profile/account">Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCheckOutModal(false)}>Settings</Dropdown.Item>
                        <Dropdown.Item onClick={logout} style={{color: 'red'}}>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Link onClick={handleFullscreen} className='hidden md:block lg:block'>
                        {!screen && <FaExpandArrowsAlt/>}
                        {screen && <FaCompressArrowsAlt/>}
                    </Navbar.Link>
                </Navbar.Collapse>
            { message && <Alert color="info"><span className="font-medium">{message}</span></Alert>}
            </Navbar>
            <Modal show={openModal} size='4xl' onClose={() => setOpenModal(false)}>
                <Modal.Header>Cart<span className='text-xs text-slate-400 cart'><span className='text-red-600'>!</span>(The Cart is stored on your device and is not accessible on other devices)</span></Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-4">
                    {cartItems.length > 0 ? (
                        uniqueItemNames.map(itemName => {
                            const sameItems = cartItems.filter(cartItem => cartItem.itemname === itemName);
                            const totalQuantity = sameItems.reduce((total, cartItem) => total + parseInt(cartItem.quantity || 1, 10), 0);
                            
                            const item = sameItems[0]; // Take the first item for other details

                            return (
                                <div key={item.id}>
                                    <div className="bg-white p-4 rounded-lg shadow-md relative">
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
                                                <span className="font-semibold">Total Price:</span> ₱{item.sellingprice}
                                            </p>
                                            <p className="text-gray-600 mb-2">
                                                <span className="font-semibold">Branch:</span> {item.branch}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-0 right-0 flex gap-3 mr-2 mb-2">
                                            <button onClick={() => updateQuantity(item.id, 1)}>
                                                <TiPlus className='w-5 h-5'/>
                                            </button>
                                            <button onClick={() => updateQuantity(item.id, -1)} disabled={totalQuantity <= 1}>
                                                <TiMinus className='w-5 h-5'/>
                                            </button>
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
                        {cartItems.length > 0 && 
                            <Button color="success" onClick={handleCheckout}>Checkout</Button>
                        }
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Back
                        </Button>
                    </div>
                    <h1>
                        Total: <span className='font-extrabold'>₱{cartItems.length > 0 ? cartItems.map(item => parseFloat(item.sellingprice * item.quantity)).reduce((total, value) => total + value, 0).toFixed(2) : 0.00}</span>
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
            <Messages />
        </>
    );
}
 
export default TopNavbar;