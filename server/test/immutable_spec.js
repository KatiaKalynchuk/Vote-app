import {expect} from 'chai';
import {List} from 'immutable';

describe('immutability', () => {

    describe('A list', () => {

        function addGame(currentState, game) {
            return currentState.set(
                'games',
                currentState.get('games').push(game)
            );
        }

        it('is immutable', () => {
            let state = List.of('The Witcher', 'Dragon Age');
            let nextState = addGame(state, 'Skyrim');

            expect(nextState).to.equal(List.of(
                'The Witcher',
                'Dragon Age',
                'Skyrim'
            ));
            expect(state).to.equal(List.of(
                'The Witcher',
                'Dragon Age'
            ))
        })
    })
});
