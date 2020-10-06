import React, { useContext, Fragment, useState, useEffect } from 'react'
import { TokenContext } from '../services/TokenContext.js'
import Copyrights from './Copyrights'
import { Button, Typography, makeStyles, Container, CircularProgress, Grid, Card, CardContent, CardMedia, CardActions } from '@material-ui/core'
import axios from "axios"


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

const Drive = () => {

    const [items, setItems] = useState(null)
    const { token } = useContext(TokenContext)
    const [isUploading, setIsUploading] = useState(false)
    const [file, setFile] = useState(null)

    const classes = useStyles()

    useEffect(() => {
        if (items == null)
            axios.post('http://localhost:5000/drive/getFiles', { token: JSON.parse(token) }).then((res) => {
                if (res.status != 200) return console.log(res.statusText);
                let list = []
                res.data.forEach(file => {
                    if (file.mimeType != "application/vnd.google-apps.folder")
                        list.push(
                            <Grid item key={file.id} xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={file.mimeType == "image/pdf" ? 'https://lh3.googleusercontent.com/3ZIeMM3dwbWF779zF8ZXnb-yr71DIGsxhsZzrrIOofhTfpd00xEwuITAB6k1sRGDrSk' :
                                            file.mimeType == "image/png" ? 'https://images.wondershare.com/recoverit/article/2020/05/cant-open-png-file-0.jpg' :
                                                file.mimeType == "application/x-zip-compressed" ? 'https://img.favpng.com/18/16/5/minecraft-pocket-edition-zip-android-rar-computer-file-png-favpng-Q3p0Bm9Wk5QErxKabHbzYZ02U.jpg' :
                                                    file.mimeType.startsWith('image') ? 'https://static.thenounproject.com/png/59103-200.png' :
                                                        file.mimeType.startsWith('video') ? 'https://i0.wp.com/www.dignited.com/wp-content/uploads/2019/03/images-1.png?fit=225%2C225&ssl=1' :
                                                            file.mimeType.startsWith('application') ? 'data:image/png;base64,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' :
                                                                file.mimeType.startsWith('text') ? 'https://static.thenounproject.com/png/56875-200.png' : 'https://www.technipages.com/wp-content/uploads/2019/12/File-Header-1.jpg'
                                        }
                                        title="File title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {file.name}
                                        </Typography>
                                    </CardContent>
                                    {file.name.startsWith('file_') ?
                                        <CardActions>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => onDelete(file.id, file.name)}>
                                                Delete File
                                    </Button>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onDownload(file.id, file.name)}>
                                                Download File
                                    </Button>
                                        </CardActions> : <CardActions>
                                            <Typography>
                                                You can't download or delete this file in here
                                            </Typography>
                                            </CardActions>}
                                </Card>
                            </Grid>
                        );
                });
                setItems(list)
                console.log('Items loaded')
            })
    })

    const onUpload = event => {
        setIsUploading(true);
        var formdata = new FormData();
        formdata.append('file', file);
        formdata.append('token', token);
        setFile(null)
        axios.post('http://localhost:5000/drive/upload', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.status != 200) return alert('Upload Failed');
            setIsUploading(false);
            alert('Upload Complete'); window.location.reload();
        }).catch((e) => {
            setIsUploading(false);
            alert('Upload Failed');
        });
    }

    const onDownload = async (id, name) => {
        var response = await axios.post('http://localhost:5000/drive/download/' + id, { token: JSON.parse(token) }, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
    }

    const onDelete = async (id, name) => {
        if (window.confirm(`Do you want to delete ${name} ?`)) {
            await axios.post('http://localhost:5000/drive/delete/' + id, { token: JSON.parse(token) });
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
                            Your Files
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            You can upload, delete, download files in you drive. However, deleting and downloading files are only available if it was uploaded using this application
                        </Typography>
                        <center>
                            {isUploading ? <CircularProgress /> :
                                file != null ?
                                    <span>
                                        <Button style={{ marginRight: 30 }}
                                            variant="contained"
                                            component="label" onClick={onUpload}>
                                            Upload {file.name}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            component="label" onClick={() => setFile(null)}>
                                            Cancel
                                        </Button>
                                    </span> :
                                    <Button
                                        variant="contained"
                                        component="label">
                                        Upload File
                                    <input
                                            type="file" onChange={(e) => { setFile(e.target.files[0]); console.log(e.target.files[0]); }}
                                            style={{ display: "none" }} />
                                    </Button>
                            }
                        </center>
                    </Container>
                    {items == null ?
                        <center style={{ marginTop: 30 }}>
                            <CircularProgress />
                            <Typography>
                                Loading Files...
                        </Typography></center> : items.length === 0 ?
                            <center style={{ marginTop: 30 }}>
                                <Typography>
                                    No Files Available
                                </Typography>
                            </center> : null}
                    <Container className={classes.cardGrid} maxWidth="lg">
                        {/* End hero unit */}
                        <Grid container spacing={5}>
                            {items}
                        </Grid>

                    </Container>
                </div>
            </main>
            <Copyrights />
        </Fragment>
    )
}

export default Drive
