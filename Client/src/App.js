
import React from "react"
import { Container } from "@material-ui/core"
import { Helmet } from 'react-helmet'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import Learn from "./components/Learn/Learn"
import Practice from "./components/Practice/Practice"
import Compete from "./components/Compete/Compete"

const App = () => {
    const TITLE = 'TypeNews'
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Helmet>
                    <title>{TITLE}</title>
                </Helmet>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Auth" exact component={Auth} />
                    <Route path="/Learn" exact component={Learn} />
                    <Route path="/Practice" exact component={Practice} />
                    <Route path="/Compete" exact component={Compete} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App