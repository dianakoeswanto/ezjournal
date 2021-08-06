import './App.css';
import React from 'react';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Classes from './pages/Classes';
import TopBar from './component/TopBar';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

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
                <Route exact path="/" component={Home} />
                <Route exact path="/children/:id/classes" component={Classes} />
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