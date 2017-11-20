import React, {Component} from 'react';
import {List} from 'immutable';

const pair = List.of('The Witcher', 'Dragon Age');

export default class App extends Component {
    render() {

        let children = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {pair: pair});
        });
        console.log(children);
        return (
            <div>
                {children}
            </div>
        );
    }
}