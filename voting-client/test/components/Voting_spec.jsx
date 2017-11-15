import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';
import {List} from 'immutable';
import {expect} from 'chai';

import Voting from '../../src/components/Voting';

describe('Voting', () => {
    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={['The Witcher', 'Dragon Age']} />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('The Witcher');
        expect(buttons[1].textContent).to.equal('Dragon Age');
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = entry => votedWith = entry;

        const compoent = renderIntoDocument(
            <Voting pair={['The Wither', 'Dragon age']} vote={vote} />
        );

        const buttons = scryRenderedDOMComponentsWithTag(compoent, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal('The Witcher');
    });

    it('disable a button when user vote', () => {
        const component = renderIntoDocument(
            <Voting pair={['The Wither', 'Dragon age']} hasVoted="The Witcher" />
        )

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('add label to entry, which is voted', () => {
        const component = renderIntoDocument(
            <Voting pair={['The Witcher', 'Dragon age']}
                    hasVoted="The Witcher" />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[0].textContent).to.contains('Voted')
    });

    it('render only winner', () => {
        const component = renderIntoDocument(
            <Voting winner="The Witcher" />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contains('The Witcher');
    });

    it('render as a pure component', () => {
        const pair = ['The Witcher', 'Dragon Age'];
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('The Witcher');

        pair[0] = 'Tomb Raider';
        component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('The Witcher');
    });

    it('update DOM when props is changing', () => {
        const pair = List.of('The Witcher', 'Dragon Age');
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('The Witcher');

        const newPair = pair.set(0, 'Tomb Raider');
        component = ReactDOM.render(
            <Voting pair={newPair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Tomb Raider');
    });
});