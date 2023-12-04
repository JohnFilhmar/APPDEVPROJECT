import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Login from "./components/Login";
import TopNavbar from "./components/TopNavbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NotFound from './components/NotFound';
import ECommerce from './components/ECommerce';
import Transactions from './components/transactions/Transactions';
// import Messages from './components/Messages';
import Footer from './components/Footer';
import ItemForm from './components/ItemForm';
import Bayanan from './components/about/Bayanan';
import Canubing1_2 from './components/about/Canubing1_2';
import { BrowserRouter, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Profile from "./components/profile/Profile";

const App = () => (
  <BrowserRouter basename="/">
    <AppContent />
  </BrowserRouter>
);

const AppContent = () => {
  const location = useLocation();
  const isLoginPath = location.pathname === '/login';
  const isRegisterPath = location.pathname === '/register';
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {isLoggedIn && <TopNavbar />}
        <div className="container mx-auto">

          <Switch>

            {/* Public Routes */}
            {!isLoggedIn && (
              <Switch>
                <Redirect exact from="/" to="/login"/>
                <Redirect from="/dashboard" to="/login"/>
                <Redirect from="/ecomm" to="/login"/>
                <Redirect from="/transac" to="/login"/>
                <Redirect from="/itemform" to="/login"/>
                <Redirect from="/profile" to="/login"/>
                <Redirect from="/Canubing1_2" to="/login"/>
                <Redirect from="/Bayanan" to="/login"/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                {/* Fallback for unknown routes */}
                <Route path="*" component={NotFound}/>
              </Switch>
            )}
            
            {/* Authenticated Routes */}
            {isLoggedIn && (
              <Switch>
                <Redirect from="/login" to="/dashboard"/>
                <Redirect from="/register" to="/dashboard"/>
                <Route path="/profile" component={Profile}/>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/ecomm" component={ECommerce}/>
                <Route path="/transac" component={Transactions}/>
                <Route path="/itemform/:userId" component={ItemForm}/>
                <Route path="/Canubing1_2" component={Canubing1_2}/>
                <Route path="/Bayanan" component={Bayanan}/>
                {/* Fallback for unknown routes */}
                <Route path="*" component={NotFound}/>
              </Switch>
            )}
            

          </Switch>
        </div>
      </div>
      <footer className="border-t-4">
        {!isLoginPath && !isRegisterPath && <Footer />}
      </footer>
    </div>
  );
};

export default App;
