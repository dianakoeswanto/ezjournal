import './App.css';
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Classes from './pages/Classes';

const App = (): React.ReactElement => {
  return (
    <Router>
      <Container fixed>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/children/:id/classes" component={Classes} />
        </Switch>
      </Container>
    </Router>
      
  );
}

export default App;

// Parent
  // List of children <- Home
    // List of classes
      // List of lessons
        // Lesson details

// Teacher
  // List of classes <- Home
    // List of lessons
      // Lesson details