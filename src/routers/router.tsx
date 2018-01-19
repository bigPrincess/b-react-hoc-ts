import * as React from 'react';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { HomeComponent} from '../modules/home/index';

export class RouterComponent extends React.Component<any, any>{
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={HomeComponent} /> 
                </Switch>
            </Router>
        );
    }
}