import React, { useContext } from 'react';
import { Avatar, Button, AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { Link } from "react-router-dom";
import { TokenContext } from '../../services/TokenContext';
import { UserContext } from '../../services/UserContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    }
}));

const App = () => {

    const classes = useStyles();
    const { setToken } = useContext(TokenContext);
    const { user, setUser } = useContext(UserContext);

    return (
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>
                <Avatar alt="Profile Picture" src={user?.picture} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Typography variant="h6" className={classes.title}>
                    Welcome {user?.name.split(' ')[0]}
                </Typography>
                <Link to="/" className={classes.link}>
                    <Button color="inherit" >Home</Button>
                </Link>
                <Link to="/Drive" className={classes.link}>
                    <Button color="inherit" >Drive</Button>
                </Link>
                <Link to="/Calendar" className={classes.link}>
                    <Button color="inherit" >Calendar</Button>
                </Link>
                <Button onClick={() => { setToken(''); setUser(''); }} color="inherit" >Log Out</Button>
            </Toolbar >
        </AppBar >
    );
}

export default App;