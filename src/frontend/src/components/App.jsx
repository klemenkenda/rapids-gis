import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import ReactRouterPropTypes from "react-router-prop-types";
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';

// bootstrap components
import { Container } from 'react-bootstrap';

// components
import Header from "./Header";
import Login from "./Login";
import RapidGIS from "./RapidGIS";
// import Home from "./Home";
import Live from "./Live";
import Logout from "./Logout";
import Maps from "./Maps";

// CSS
import './css/App.css';

// types
type Props = {
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location
}
type State = {};

class App extends React.Component<Props, State> {
    render() {
        return [
            <Router basename={process.env.PUBLIC_URL} key={1}>
                <Switch>
                    <Route path="!/" exact={true} key={1}>
                        <Header />
                    </Route>
                </Switch>
            </Router>,
            <Router basename={process.env.PUBLIC_URL} key={2}>
                <Switch>
                    <Route path="/" exact={true} key={1} component={RapidGIS} />
                    <Route path="/login" key={2}>
                        <Container>
                            <Login />
                        </Container>
                    </Route>
                    <Route path="/logout" key={3}>
                        <Container>
                            <Logout />
                        </Container>
                    </Route>
                    <Route path="/live/:id" key={4} component={Live} />
                    <Route path="/maps" exact={true} key={5}>
                        <Maps />
                    </Route>
                </Switch>
            </Router>,
            <Router basename={process.env.PUBLIC_URL} key={3}>
                <Switch>
                    <Route path="!/" exact={true} key={1}>
                        <footer className="text-muted pt-4" style={{ borderTop: "1px solid #eee" }}>
                            <div className="container">
                                <p className="float-right">
                                    <a href="#home">Back to top</a>
                                </p>
                                <p>&copy; E3 (Klemen Kenda), IJS</p>
                            </div>
                        </footer>
                    </Route>
                </Switch>
            </Router>
        ];
    }
}

export default App;
