import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Login from "./components/Login";
import TopNavbar from "./components/TopNavbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Router>
        <AppContent />
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
        <Route exact path="*" component={NotFound}/>
      </Switch>
    </>
  );
};

export default App;
