import './App.css';
import React from 'react';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ChildClasses from './pages/ChildClasses';
import TopBar from './component/TopBar';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';
import ProtectedRoute from "./auth/ProtectedRoute";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '10px'
    },
  }),
);

const App = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <Router>
        <Auth0ProviderWithHistory>
            <TopBar />
            <Container className={classes.root}>
              <Switch>
                <ProtectedRoute exact path="/" component={Home} />
                <ProtectedRoute exact path="/children/:id/classes" component={ChildClasses} />
              </Switch>
            </Container>
        </Auth0ProviderWithHistory>
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