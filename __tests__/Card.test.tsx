import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Card from '../components/home/Card';
import cards from '../components/home/cards';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

test('Test Home card', () => {
  render(<Card {...cards[0]} />);

  expect(screen.getByAltText(cards[0].alt)).toBeInTheDocument();
  expect(screen.getByText(cards[0].text)).toBeInTheDocument();
  expect(
    screen.getByText(cards[0].title, { collapseWhitespace: false, trim: true }),
  ).toBeInTheDocument();
});
