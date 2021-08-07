import './App.css';
import React from 'react';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ChildClasses from './pages/ChildClasses';
import TopBar from './component/TopBar';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';
import ProtectedRoute from "./auth/ProtectedRoute";
import Lessons from './pages/Lessons';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '10px'
    },
  }),
);

const AppContent = () => {
    const classes = useStyles();
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <TopBar />
            <Container className={classes.root}>
                <Switch>
                    <ProtectedRoute exact path="/" component={Home} />
                    <ProtectedRoute exact path="/children/:id/classes" component={ChildClasses} />
                    <ProtectedRoute exact path="/classes/:class_id/lessons" component={Lessons} />
                    <ProtectedRoute exact path="/children/:id/classes/:class_id/lessons" component={Lessons} />
                </Switch>
            </Container>
        </>
    );
};

const App = (): React.ReactElement => (
    <Router>
        <Auth0ProviderWithHistory>
            <AppContent />
        </Auth0ProviderWithHistory>
    </Router>
);

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