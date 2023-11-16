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

const Layout = ({ children, foot }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow ">{children}</div>
      <footer container className="border-t-4">
        {foot}
      </footer>
    </div>
  );
};

function App() {
  return (
    <>
      <Router>
        <Layout children={<AppContent/>} foot={<Footer/>}/>
        {/* <AppContent />
        <Footer /> */}
      </Router>
    </>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isLoginPath = location.pathname === '/login';
  const isRegisterPath = location.pathname === '/register';
  
  return (
    <>
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
    </>
  );
};

export default App;
