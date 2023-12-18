import { BrowserRouter, Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import All from "./purchases/All";
import Pending from "./purchases/Pending";
import ToPickUp from "./purchases/ToPickUp";
import Returns from "./purchases/Returns";

const Purchases = () => {

    return (
        <>
        <BrowserRouter basename="/profile/purchases">
            <div className="ml-5 flex flex-col md:block lg:block">
                <div className="flex gap-4 text-center text-xl font-light mb-5 bg-slate-50 border-b border-gray-500 border-t-1 border-r-1 border-l-1 py-3">
                    <Link to="/all" className="basis-5/12 hover:font-normal active:font-medium">All</Link>
                    <Link to="/pending" className="basis-5/12 hover:font-normal active:font-medium">Pending</Link>
                    <Link to="/topickup" className="basis-5/12 hover:font-normal active:font-medium">To Pick Up</Link>
                    <Link to="/returns" className="basis-5/12 hover:font-normal active:font-medium">Returns</Link>
                </div>
            </div>
            <Switch>
                <Route path="/all" component={All}/>
                <Route path="/pending" component={Pending}/>
                <Route path="/topickup" component={ToPickUp}/>
                <Route path="/returns" component={Returns}/>
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
        </>
    );
}
 
export default Purchases;