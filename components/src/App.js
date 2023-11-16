import { Router } from 'react-router-dom';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
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
          <Route exact path="/canubingmain" component={CanubingMain}/>
          <Route exact path="/canubing1_2" component={Canubing1_2}/>
          <Route exact path="/bayanan" component={Bayanan}/>
          <Route exact path="/malinao" component={Malinao}/>
          <Route exact path="/notfound" component={NotFound}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
