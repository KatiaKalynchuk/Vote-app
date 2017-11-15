import React, {Component} from 'react';
import {List} from 'immutable';

const pair = List.of('The Witcher', 'Dragon Age');

export default class App extends Component {
    render() {
        return React.cloneElement(this.props.children, {pair: pair})
    }
}