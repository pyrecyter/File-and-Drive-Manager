import React from 'react';
import { Button, AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import axios from "axios";

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
}));

const App = () => {

    const classes = useStyles();

    const login = event => {
        axios.get('http://localhost:5000/auth/oauth').then((res) => {
            console.log(res);
            if (res.status == 200) window.location.replace(res.data);
        });
    }

    return (
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    File and Event Manager </Typography>
                <Button color="inherit" onClick={login}>Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default App;