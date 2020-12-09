import React from 'react';
import { render, screen } from '../test-utils';
import Home from '../pages';

test('Home Intro test', () => {
  render(<Home />);

  expect(
    screen.getByText(
      "Qui a dit qu'internet allait tuer nos petites librairies ?",
    ),
  ).toBeInTheDocument();
});
