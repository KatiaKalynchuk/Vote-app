import React, {Component} from 'react';
import PureComponent from 'react.pure.component';

class Vote extends Component {

    getPair() {
        return this.props.pair || [];
    }

    isDisabled() {
        return !!this.props.hasVoted;
    }

    hasVotedFor(entry) {
        return this.props.hasVoted === entry
    }

    render() {
        return <div className="voting">
            {this.getPair().map(entry =>
                <button key={entry}
                        disabled={this.isDisabled()}
                        onClick={() => this.props.vote(entry)}>
                    <h1>{entry}</h1>
                    {this.hasVotedFor(entry) ? <div className="ladel">Voted</div> : null}
                </button>
                )}
        </div>
    }
}

export default PureComponent(Vote);