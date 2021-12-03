import React from 'react';
import ArtistProfile from './ArtistProfile';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";

const Artist = () => {


    let { path } = useRouteMatch();

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path={path}>
                        <ArtistProfile />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default Artist;