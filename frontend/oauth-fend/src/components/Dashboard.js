import React, { useContext, Fragment } from 'react'
import { UserContext } from '../services/UserContext.js'
import Copyrights from './Copyrights'
import { Button, Typography, makeStyles, Container, Avatar, Grid } from '@material-ui/core'
import { Link } from "react-router-dom"

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(30, 0, 6)
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: 20
    }
}));

const Dashboard = () => {

    const { user } = useContext(UserContext);

    const classes = useStyles()

    return (
        <Fragment>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="md" >
                        <center>
                            <Avatar alt="Profile Picture" src={user?.picture} className={classes.avatar} />
                        </center>
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            Welcome back {user?.name}
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            Now you can use your drive and calendar to manage your files and events
                        </Typography>

                    </Container>
                </div>
                <Container>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                            <Link to="/Drive" className={classes.link}>
                                <Button variant="outlined" color="primary">
                                    Manage Files
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/Calendar" className={classes.link}>
                                <Button variant="outlined" color="primary">
                                    Manage Events
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <Copyrights />
        </Fragment>
    )
}

export default Dashboard
