import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

describe('application logic', () => {

    describe('setEntries', () => {
        it('add entry to state', () => {
            const state = Map();
            const entries = ['The Witcher', 'Dragon Age'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('The Witcher', 'Dragon Age')
            }));
        });
    });

    describe('next', () => {
        it('take the next two entries for voting', () => {
            const state = Map({
                entries: List.of('The Witcher', 'Dragon Age', 'Skyrim')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('The Witcher', 'Dragon Age')
                }),
                entries: List.of('Skyrim')
            }));
        });

        it('puts the winner of the current vote at the end of the entries list', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('The Witcher', 'Dragon Age'),
                    tally: Map({
                        'The Witcher': 4,
                        'Dragon Age': 2
                    })
                }),
                entries: List.of('Skyrim', 'Tomb Raider', 'Days gone')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Skyrim', 'Tomb Raider')
                }),
                entries: List.of('Days gone', 'The Witcher')
            }));
        });

        it('in the event of a tie, put both entries at the end of the list', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('The Witcher', 'Dragon Age'),
                    tally: Map({
                        'The Witcher': 3,
                        'Dragon Age': 3
                    })
                }),
                entries: List.of('Skyrim', 'Tomb Raider', 'Days gone')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Skyrim', 'Tomb Raider')
                }),
                entries: List.of('Days gone', 'The Witcher', 'Dragon Age')
            }));
        });

        it('when there is only one entry, mark it as the winner', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('The Witcher', 'Dragon Age'),
                    tally: Map({
                        'The Witcher': 4,
                        'Dragon Age': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'The Witcher'
            }));
        })
    });

    describe('vote', () => {
        it('create the result of voting for selected entry', () => {
            const state = Map({
                    pair: List.of('The Witcher', 'Dragon Age')
            });
            const nextState = vote(state, 'The Witcher');
            expect(nextState).to.equal(Map({
                    pair: List.of('The Witcher', 'Dragon Age'),
                    tally: Map({
                        'The Witcher': 1
                }),
            }));
        });

        it('adds to the existing result for the selected record', () => {
            const state = Map({
                    pair: List.of('The Witcher', 'Dragon Age'),
                    tally: Map({
                        'The Witcher': 3,
                        'Dragon Age': 2
                })
            });
            const nextState = vote(state, 'The Witcher');
            expect(nextState).to.equal(Map({
                    pair: List.of('The Witcher', 'Dragon Age'),
                    tally: Map({
                        'The Witcher': 4,
                        'Dragon Age': 2
                })
            }))
        })
    })

});
