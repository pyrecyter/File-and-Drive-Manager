import React, { Fragment } from 'react'
import { Button, Typography, makeStyles, Container, Avatar } from '@material-ui/core'
import axios from "axios"
import Copyrights from './Copyrights'

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(30, 0, 6)
    },
}));

const Home = () => {

    const classes = useStyles();

    const login = event => {
        event.preventDefault();
        axios.get('http://localhost:5000/auth/oauth').then((res) => {
            console.log(res);
            if (res.status == 200) window.location.replace(res.data);
        });
    }

    return (
        <Fragment >
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="md" >
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            Manage Your Events and Files
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            See your files, download them, add them, delete them and create and delete events. We manage your Google Drive and Calendar for you
                        </Typography>

                    </Container>
                </div>
                <section>
                    <center>
                        <Button
                            color="inherit"
                            variant="contained"
                            size="large"
                            onClick={login}
                        >
                            <Avatar alt="Google Icon" src="https://www.iconfinder.com/data/icons/social-media-2210/24/Google-512.png" style={{ width: 30, height: 30, marginRight: 10 }} />
                            Login Using Google
            </Button>
                    </center>
                </section>
            </main>
            <Copyrights />
        </Fragment>
    )
}

export default Home
