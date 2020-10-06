import React from 'react'
import { Typography } from '@material-ui/core'


var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
    display: 'block',
    padding: '20px',
    height: '80px',
}



const Copyrights = () => {

    return (
        <footer >
            <div style={phantom} />
            <div style={style}>
                <Typography variant="h6" align="center" gutterBottom>
                    Sachira Nuwanga || Isuru Liyanage
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                    {"Copyright © "}
                    {new Date().getFullYear()}
                </Typography>
            </div>
        </footer>
    )
}

export default Copyrights
