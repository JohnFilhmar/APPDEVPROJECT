import { FaShoppingBag, FaUser, FaUserEdit } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { BrowserRouter, Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Account from './Account';
import EditAccount from './EditAccount';
import Purchases from './Purchases';
import Notifs from './Notifs';

const Profile = () => {
    
    return (
        <>
        <BrowserRouter basename="/profile">
            <div className="bg-gray-100 h-auto container mx-auto md:flex lg:flex md:flex-row lg:flex-row gap-5 px-20 py-20 rounded-lg mt-5 mb-5">
                <div className="basis-1/5 grid grid-cols-1 gap-5">
                    <div>
                        <p className='text-lg font-bold text-slate-400 pl-1'>Account</p>
                        <div className="h-auto mt-5 text-slate-900">
                            <Link to="/account" className="flex py-4">
                                <FaUser  className="w-5 h-5 mr-3"/>
                                <p className="text-base hover:font-bold active:font-extrabold">Account Details</p>
                            </Link>
                            <Link to="/edit" className="flex py-4">
                                <FaUserEdit  className="w-5 h-5 mr-3"/>
                                <p className="text-base hover:font-bold active:font-extrabold">Edit Account</p>
                            </Link>
                            <Link to="/purchases/all" className="flex py-4">
                                <FaShoppingBag  className="w-5 h-5 mr-3"/>
                                <p className="text-base hover:font-bold active:font-extrabold">Purchases</p>
                            </Link>
                            {/* <Link to="/notifications" className="flex py-4">
                                <IoNotifications className="w-5 h-5 mr-3"/>
                                <p className="text-base hover:font-bold active:font-extrabold">Notifications</p>
                            </Link> */}
                        </div>
                    </div>
                </div>
                <div className="basis-4/5">
                        <Switch>
                            <Route path="/account" component={Account}/>
                            <Route path="/edit" component={EditAccount}/>
                            <Route path="/purchases/all" component={Purchases}/>
                            {/* <Route path="/notifications" component={Notifs}/> */}
                            <Redirect from="*" to="/" />
                        </Switch>
                </div>
            </div>
        </BrowserRouter>
        </>
    );
}
 
export default Profile;