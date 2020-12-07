import React from 'react';
import { render, screen } from '../test-utils';
import Intro from '../components/home/Intro';

test('Home Intro test', () => {
  render(<Intro />);

  expect(
    screen.getByText(
      "Qui a dit qu'internet allait tuer nos petites librairies ?",
    ),
  ).toBeInTheDocument();
});
