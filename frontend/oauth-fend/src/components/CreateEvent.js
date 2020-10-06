import React, { useContext, Fragment, useState } from 'react'
import { TokenContext } from '../services/TokenContext.js'
import Copyrights from './Copyrights'
import { Button, Typography, makeStyles, Container, CircularProgress, TextField } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'
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
}));

const CreateEvent = () => {

    const { token } = useContext(TokenContext)
    const [isUploading, setIsUploading] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')

    const classes = useStyles()

    const onSubmit = () => {
        //if (startDate == null || startTime == null || endDate == null || endTime == null || summery == '' || description == '' ) return window.alert('Please Fill All !');

        var month = startDate.getMonth() + 1;
        var day = startDate.getDate();
        var year = startDate.getFullYear();

        var hour = startTime.getHours();
        if (hour < 10)
            hour = "0" + hour;

        var min = startTime.getMinutes();
        if (min < 10)
            min = "0" + min;

        var sec = startTime.getSeconds();
        if (sec < 10)
            sec = "0" + sec;
        var startDateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;

        month = endDate.getMonth() + 1;
        day = endDate.getDate();
        year = endDate.getFullYear();

        hour = endTime.getHours();
        if (hour < 10)
            hour = "0" + hour;

        min = endTime.getMinutes();
        if (min < 10)
            min = "0" + min;

        sec = endTime.getSeconds();
        if (sec < 10)
            sec = "0" + sec;

        var endDateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
        let event = {
            "summary": summary,
            "description": description,
            "start": {
                "dateTime": (new Date(startDateTime)).toISOString()
            },
            "end": {
                "dateTime": (new Date(endDateTime)).toISOString()
            }
        }
        console.log(startDateTime)

        setIsUploading(true);
        axios.post('http://localhost:5000/calendar/insert', { token: JSON.parse(token), event })
            .then((res) => {
                setIsUploading(false);
                if (!(res.status == 200 || res.status == 204)) return alert('Event Adding Failed');
                alert('Event Added');
                return window.location.href = '/Calendar'
            }).catch((e) => {
                setIsUploading(false);
                alert('Error : Event Adding Failed');
            });


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
                            Add Event
                    </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            Please fill the field and press submit to add the event to your calendar
                    </Typography>
                        <center>
                            <div style={{ marginBottom: 30 }}>
                                <TextField id="standard-basic" label="Summery" onChange={(e) => setSummary(e.target.value)} value={summary} />
                            </div>
                            <div style={{ marginBottom: 30 }}>
                                <TextField fullWidth id="standard-basic" label="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
                            </div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <div style={{ marginBottom: 30 }}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Start Date"
                                        format="MM/dd/yyyy"
                                        value={startDate}
                                        onChange={setStartDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Start Time"
                                        value={startTime}
                                        onChange={setStartTime}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: 30 }}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="End Date"
                                        format="MM/dd/yyyy"
                                        value={endDate}
                                        onChange={setEndDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="End Time"
                                        value={endTime}
                                        onChange={setEndTime}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </div>
                            </MuiPickersUtilsProvider>
                            {isUploading ? <CircularProgress /> :
                                <div>
                                    <Link to="/Calendar" className={classes.link}>
                                        <Button
                                            style={{ marginRight: 30 }}
                                            variant="contained"
                                            component="label">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        onClick={onSubmit}>
                                        Submit
                                    </Button>
                                </div>
                            }
                        </center>
                    </Container>
                </div>
            </main>
            <Copyrights />
        </Fragment>
    )
}

export default CreateEvent
