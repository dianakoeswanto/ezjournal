import { AppBar, createStyles, IconButton, makeStyles, Menu, MenuItem, Theme, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: "10px",
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange['A200']),
        backgroundColor: deepOrange['A200'],
    },
  }),
);

const TopBar = (): React.ReactElement => {
  const classes = useStyles();
  const { logout, user } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(JSON.stringify(user));
  if (!user) {
      // Showing nothing is the best way here. This path is hit under 2 different scenarios: when user about to log in
      // and after user logged out. We can't tell which scenario is happening right now and there doesn't seem to be a visual
      // that works for both cases. So showing nothing seems like the best option.
      // @ts-ignore
      return null;
  }

  return (
    <AppBar position="static">
        <Toolbar>
          {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}
            <Avatar variant="square"
                    alt="ezjournal"
                    src={`${window.location.origin}/ezjournal.png`}
                    onClick={() => history.push('/')}
                    style={{cursor: 'pointer'}}/>
          <Typography variant="h6" className={classes.title}>
            EZJournal
          </Typography>
          {user && (<div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar className={classes.orange}>{(user['given_name'] || user.name || '')[0]}</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>Logout</MenuItem>
              </Menu>
            </div>)}
        </Toolbar>
    </AppBar>
  )
};

export default TopBar;