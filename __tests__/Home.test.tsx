import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Intro from '../components/home/Intro';

test('Home Intro test', () => {
  render(<Intro />);

  expect(
    screen.getByText(
      "Qui a dit qu'internet allait tuer nos petites librairies ?",
    ),
  ).toBeInTheDocument();
});
