import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import AddEditForms from './components/AddEditForms';
import Show from './components/Show';
import NotFound from './components/NotFound';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/add" exact component={AddEditForms}/>
            <Route path="/edit/:id" exact component={AddEditForms}/>
            <Route path="/show/:id" exact component={Show}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
