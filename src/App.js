import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './view/login';
import Administrador from './view/Administrador';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from '../src/store';
import Caixa from './view/Caixa';
import { Provider } from 'react-redux';
import Cozinha from './view/Cozinha';
import Cliente from './view/Cliente';



function App() {
  return (


    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/' component={Login}></Route>
          <Route exact path='/adm' component={Administrador}></Route>
          <Route exact path='/caixa' component={Caixa}></Route>
          <Route exact path='/cozinha' component={Cozinha}></Route>
          <Route exact path='/cliente' component={Cliente}></Route>
        </Router>
      </PersistGate>
    </Provider>

  );
}

export default App;
