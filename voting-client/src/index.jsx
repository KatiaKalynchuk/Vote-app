import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom';

import App from './components/App';
import Voting from './components/Voting';

const pair = ['The Witcher', 'Dragon Age'];

const routes = <Route component={App}>
    <Route path="/" component={Voting} />
</Route>;

ReactDOM.render(
    <BrowserRouter>{routes}</BrowserRouter>,
    document.getElementById('app')
);
