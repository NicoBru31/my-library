import React from 'react';
import { render, screen } from '../test-utils';
import Card from '../components/home/Card';
import cards from '../components/home/cards';

test('Test Home card', () => {
  render(<Card {...cards[0]} />);

  expect(screen.getByAltText(cards[0].alt)).toBeInTheDocument();
  expect(screen.getByText(cards[0].text)).toBeInTheDocument();
  expect(
    screen.getByText(cards[0].title, { collapseWhitespace: false, trim: true }),
  ).toBeInTheDocument();
});
