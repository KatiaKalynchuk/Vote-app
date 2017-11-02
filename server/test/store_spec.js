import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {
    it('store is configured using the correct converter', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['The Witcher', 'Dragon Age']
        });
        expect(store.getState()).to.equal(fromJS({
            entries: ['The Witcher', 'Dragon Age']
        }));
    })
});
