import React from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Login from "./components/Login";
import TopNavbar from "./components/TopNavbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NotFound from './components/NotFound';
import ECommerce from './components/ECommerce';
import Messages from './components/Messages';
import Footer from './components/Footer';
import ItemForm from './components/ItemForm';

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

const AppContent = () => {
  const location = useLocation();
  const isLoginPath = location.pathname === '/login';
  const isRegisterPath = location.pathname === '/register';
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="container mx-auto">
          {!isLoginPath && !isRegisterPath && <TopNavbar />}
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/ecomm" component={ECommerce}/>
            <Route exact path="/messaging" component={Messages}/>
            <Route exact path="/itemform" component={ItemForm}/>
            <Route exact path="*" component={NotFound}/>
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
