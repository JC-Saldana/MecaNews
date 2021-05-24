
import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from "@material-ui/core"
import Options from "../Options/Options"
import { useDispatch } from "react-redux"
import { getPosts } from "../../actions/posts"
import useStyles from "./styles"


const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainGrid} container direction="column" justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Options setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
