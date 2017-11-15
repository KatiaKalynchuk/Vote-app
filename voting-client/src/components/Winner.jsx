import React, {Component} from 'react';
import PureComponent from 'react.pure.component';

class Winner extends Component {

    render() {
        return <div className="winner">Winner is {this.props.winner}!</div>
    }
}

export default PureComponent(Winner);