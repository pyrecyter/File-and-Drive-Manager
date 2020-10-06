import React, { useContext } from 'react'
import { Switch, Route } from "react-router-dom"
import Drive from './Drive'
import Calendar from './Calendar'
import AddEvent from './CreateEvent'
import Home from './Home'
import Dashboard from './Dashboard'
import { TokenContext } from '../services/TokenContext.js'

const Main = () => {

    const { token } = useContext(TokenContext)

    return (
        <main>
            <Switch>
                <Route exact path="/Drive" component={() => token == '' ? Home() : Drive()} />
                <Route exact path="/Calendar" component={() => token == '' ? Home() : Calendar()} />
                <Route exact path="/AddEvent" component={() => token == '' ? Home() : AddEvent()} />
                <Route component={() => token == '' ? Home() : Dashboard()} />
            </Switch>
        </main>
    )
}

export default Main
