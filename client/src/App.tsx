import './App.css';
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

const App = (): React.ReactElement => {
  return (
    <Router>
      <Container fixed>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Container>
    </Router>
      
  );
}

export default App;
