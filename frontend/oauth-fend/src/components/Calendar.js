import React, { useContext, Fragment, useState, useEffect } from 'react'
import { TokenContext } from '../services/TokenContext.js'
import Copyrights from './Copyrights'
import { Button, Typography, makeStyles, Container, CircularProgress, Grid, Card, CardContent, CardMedia, CardActions } from '@material-ui/core'
import axios from "axios"
import { Link } from "react-router-dom"

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(10, 0, 6)
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
}));

const Calendar = () => {

    const [events, setEvents] = useState(null)
    const { token } = useContext(TokenContext)

    const classes = useStyles()

    useEffect(() => {
        if (events == null)
            axios.post('http://localhost:5000/calendar/events', { token: JSON.parse(token) }).then((res) => {
                if (res.status != 200) return console.log(res.statusText);
                let list = []
                res.data.forEach(event => {
                    list.push(
                        <Grid item key={event.id} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image='https://www.drupal.org/files/project-images/drupal-module-calendar.jpg'
                                    title="File title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {event.summary}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Start : {event.start.dateTime ? event.start.dateTime.split('-')[0] + '/' + event.start.dateTime.split('-')[1] + '/' + event.start.dateTime.split('-')[2].split('T')[0] :
                                            event.start.date ? event.start.date.split('-')[0] + '/' + event.start.date.split('-')[1] + '/' + event.start.date.split('-')[2] : 'No Start Date'}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        End : {event.end.dateTime ? event.end.dateTime.split('-')[0] + '/' + event.end.dateTime.split('-')[1] + '/' + event.end.dateTime.split('-')[2].split('T')[0] :
                                            event.end.date ? event.end.date.split('-')[0] + '/' + event.end.date.split('-')[1] + '/' + event.end.date.split('-')[2] : 'No End Date'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="secondary"
                                        variant="contained"
                                        onClick={() => onDelete(event.id, event.summary)}>
                                        Delete Event
                                    </Button>
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        onClick={() => window.open(event.htmlLink)}>
                                        View Event
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                });
                setEvents(list)
                console.log('Items loaded')
            })
    })

    const onDelete = async (id, summary) => {
        if (window.confirm(`Do you want to delete ${summary} ?`)) {
            await axios.post('http://localhost:5000/calendar/delete/' + id, { token: JSON.parse(token) });
            window.location.reload();
        }
    }

    return (
        <Fragment>
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
                            Your Events
                    </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            You can create, delete and view events on Google Calendar
                    </Typography>
                        <center>
                            <Link to="/AddEvent" className={classes.link}>
                                <Button
                                    variant="contained"
                                    component="label">
                                    Create Event
                                </Button>
                            </Link>
                        </center>
                    </Container>
                    {events == null ?
                        <center style={{ marginTop: 30 }}>
                            <CircularProgress />
                            <Typography>
                                Loading Events...
                    </Typography></center> : events.length === 0 ?
                            <center style={{ marginTop: 30 }}>
                                <Typography>
                                    No Events Available
                            </Typography>
                            </center> : null}
                    <Container className={classes.cardGrid} maxWidth="lg">
                        {/* End hero unit */}
                        <Grid container spacing={5}>
                            {events}
                        </Grid>

                    </Container>
                </div>
            </main>
            <Copyrights />
        </Fragment>
    )
}

export default Calendar
