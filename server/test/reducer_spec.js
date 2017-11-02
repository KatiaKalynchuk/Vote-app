import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['The Witcher']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['The Witcher']
        }))
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['The Witcher', 'Dragon Age']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['The Witcher', 'Dragon Age']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['The Witcher', 'Dragon Age']
            },
            entries: []
        });
        const action = {type: 'VOTE', entries: 'The Witcher'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['The Witcher', 'Dragon Age'],
                tally: {'The Witcher': 1}
            },
            entries: []
        }));
    });

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['The Witcher']};
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            entries: ['The Witcher']
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['The Witcher', 'Dragon Age']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'The Witcher'},
            {type: 'VOTE', entry: 'Dragon Age'},
            {type: 'VOTE', entry: 'The Witcher'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'The Witcher'
        }));
    });
});
