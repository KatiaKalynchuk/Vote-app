import React, {Component} from 'react';
import PureComponent from 'react.pure.component';

import Winner from './Winner';
import Vote from './Vote';

class Voting extends Component {

    render() {
        return <div>
            {this.props.winner ?
                <Winner ref="winner" winner={this.props.winner} /> :
                <Vote {...this.props} />}
        </div>
    }
}

export default PureComponent(Voting);

