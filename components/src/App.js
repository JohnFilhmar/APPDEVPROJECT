import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import CanubingMain from './components/CanubingMain';
import Canubing1_2 from './components/Canubing1_2';
import Bayanan from './components/Bayanan';
import Malinao from './components/Malinao';
import NotFound from './components/NotFound';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/canubingmain" component={CanubingMain}/>
          <Route path="/canubing1_2" component={Canubing1_2}/>
          <Route path="/bayanan" component={Bayanan}/>
          <Route path="/malinao" component={Malinao}/>
          <Route path="/*" component={NotFound}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
