import { AppBar, Backdrop, Box, Button, CircularProgress, makeStyles, Paper, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, deletePost, getPosts } from '../../actions/posts';
import PropTypes from 'prop-types';
import rss1 from "../../img/rss1.PNG"
import rss2 from "../../img/rss2.PNG"
import rss3 from "../../img/rss3.PNG"
import CloseIcon from '@material-ui/icons/Close';
import './main.css'
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        backgroundColor: "#03040ac4",
        display: "flex",
        flexDirection: "column"
    },
    span: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        overflow: "auto"
    },
    img1: {
        width: 800,
    },
    img2: {
        width: 800,
    },
    img3: {
        width: 800,
    },
    paper: {
        margin: 5,
        paddingRight: 30,
        paddingLeft: 30,
    },
    closeButon: {
        color: "white",
        filter: "drop-shadow(2px 2px 10px #ffffff)",
    },
    close: {
        marginTop: 30,
        fontSize: 50,
    },
    imgcontainer: {
        width: 800,
        height: 350
    }
}));

function Rss() {

    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"))
    const userId = user?.result?.googleId || user?.result?._id
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    const [postData, setPostData] = useState({ label: "", value: "", userId: userId, userName: user?.result?.name })


    useEffect(() => {
        console.log("Info: ", posts)
    }, [posts])

    let myPosts = []
    let otherPosts = []


    const handleSubmit = (e) => {
        e.preventDefault()
        myPosts.length < 10 ? dispatch(createPost({ ...postData })) : alert("No puedes añadir más! Pero pregunta al desarrollador, es muy majo :D")
        setTimeout(function () {
            dispatch(getPosts())
        }, 90);

        console.log(posts)
    }

    posts.length ?
        posts.forEach(ele => {
            if (ele.userId === userId) {
                myPosts.push(ele)
            } else {
                otherPosts.push(ele)
            }
        }) : console.log("No posts", posts)

    // Para backdrop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    // Para select
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const samplePosts = [
        {
            label: "El mundo - ultima hora",
            value: "https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml"
        },
        {
            label: "Genbeta",
            value: "http://feeds.weblogssl.com/genbeta"
        },
        {
            label: "Xataka",
            value: "http://feeds.weblogssl.com/xataka2"
        },
        {
            label: "New York Times Español",
            value: "https://rss.nytimes.com/services/xml/rss/nyt/es.xml"
        },
        {
            label: "Cointelegraph",
            value: "https://es.cointelegraph.com/rss"
        },
        {
            label: "Marca - Primera Div",
            value: "https://e00-marca.uecdn.es/rss/futbol/primera-division.xml"
        },
        {
            label: "Vogue",
            value: "https://www.vogue.com/feed/rss"
        },
        {
            label: "Ramen para dos",
            value: "https://ramenparados.com/feed/"
        },
        {
            label: "Disney",
            value: "https://anchor.fm/s/6DC76B0/podcast/rss"
        },
        {
            label: "Comics",
            value: "https://comicbookrealm.com/rss/news"
        }
    ]

    return (
        <div className="main-section">
            <div className="dir">
                <Button component={Link} to="/Practice" variant="outlined"><ArrowBackIosIcon className="backHome" /></Button>
                <h1 className="title">Añadir Noticias</h1>
                <Button variant="outlined" onClick={handleToggle}>
                    <HelpOutlineIcon></HelpOutlineIcon>
                </Button>
                <Backdrop className={classes.backdrop} open={open}>
                    <Button className={classes.closeButon}><CloseIcon onClick={handleClose} className={classes.close}>Cerrar</CloseIcon></Button>
                    <h1>¡Bienvenido a la sindicación de contenidos!</h1>
                    <span className={classes.span}>
                        <Paper className={classes.paper}>
                            <h2>Quiero más páginas de noticias YA:</h2>
                            <p>
                                Copia los enlaces de páginas que ya han subido otros usuarios
                            </p>
                            <h2>Quiero noticias de una página en concreto:</h2>
                            <p>
                                Busca en Google el enlace Rss de la página que quieras
                            </p>
                            <div className={classes.root}>
                                <AppBar position="static">
                                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                        <Tab label="1" {...a11yProps(0)} />
                                        <Tab label="2" {...a11yProps(1)} />
                                        <Tab label="3" {...a11yProps(2)} />
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={value} index={0}>
                                    <p>Busca el RRS de tu página</p>
                                    <div className={classes.imgcontainer}>
                                        <img src={rss1} className={classes.img1} />
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <p>Elige categoría (si las hay)</p>
                                    <div className={classes.imgcontainer}>
                                        <img src={rss2} className={classes.img2} />
                                    </div>

                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <p>Copia el link de la página que encuentres y pégalo en tu lista</p>
                                    <div className={classes.imgcontainer}>
                                        <img src={rss3} className={classes.img3} />
                                    </div>

                                </TabPanel>
                            </div>
                        </Paper>
                    </span>
                </Backdrop>
            </div>
            <form onSubmit={handleSubmit}>
                <Paper className="rss-row">
                    <Button type="submit" variant="contained">Añadir RSS</Button>
                    <TextField label="Nombre de la página" placeholder={"Pj: El mundo"} value={postData.label} onChange={(e) => setPostData({ ...postData, label: e.target.value })} />
                    <TextField className="rss-link" label="Enlace a feed RSS" value={postData.value} placeholder={"Pj: https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml"} onChange={(e) => setPostData({ ...postData, value: e.target.value })} />
                </Paper>
            </form>
            <div className="lista">
                <h1>Lista {user.result.name} </h1>
                {
                    !myPosts.length ?
                        <div className="vacio">
                            <CircularProgress />
                            <p>Vacío...</p>
                        </div>
                        :
                        (
                            <div className="rss-paper-container">
                                {myPosts.map(item => {
                                    return (
                                        <Paper className="rss-paper">
                                            <div className="left">
                                                <Button onClick={() => dispatch(deletePost(item._id))}>X</Button>
                                                <p className="rss-paper-p">{item.label}</p>
                                            </div>
                                            <TextField value={item.value} className="right" />
                                        </Paper>)
                                })}
                            </div>
                        )
                }
                <h1>Populares</h1>
                {
                    !samplePosts.length ?
                        <div className="vacio">
                            <CircularProgress />
                            <p>Vacío...</p>
                        </div>
                        :
                        (
                            <div className="rss-paper-container">
                                {samplePosts.map(item => {
                                    return (
                                        <Paper className="rss-paper">
                                            <div className="left">
                                            <Button onClick={(e) => setPostData({ ...postData, label: item.label, value: item.value })}><AddCircleOutlineIcon className="add"/></Button>
                                            <p className="others-rss-paper-p1">{item.userName}</p>
                                            <p className="rss-paper-p">{item.label}</p>
                                            </div>
                                            <TextField value={item.value} className="right"/>
                                        </Paper>)
                                })}
                            </div>
                        )
                }
                <h1>De otros usuarios</h1>
                {
                    !otherPosts.length ?
                        <div className="vacio">
                            <CircularProgress />
                            <p>Vacío...</p>
                        </div>
                        :
                        (
                            <div className="rss-paper-container">
                                {otherPosts.map(item => {
                                    return (
                                        <Paper className="rss-paper">
                                             <div className="left">
                                            <Button onClick={(e) => setPostData({ ...postData, label: item.label, value: item.value })}><AddCircleOutlineIcon className="add" /></Button>
                                            <p className="others-rss-paper-p1">{item.userName}</p>
                                            <p className="rss-paper-p">{item.label}</p>
                                            </div>
                                            <TextField value={item.value} className="right"/>
                                        </Paper>)
                                })}
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Rss
