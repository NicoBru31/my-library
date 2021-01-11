import { RecoType } from '../types';

export const queryAdapter = (data: Record<string, string>) =>
  Object.entries(data).reduce(
    (final, [key, val]) => `${final}${key}=${val}&`,
    '?',
  );

export const randomStr = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);

export const filterRecoByDone = (data: RecoType[], id?: string) =>
  data.filter(
    ({ answers }) =>
      answers.filter(
        ({ books, sellerId }) => sellerId === id && books.length === 0,
      ).length === 0,
  );

export const filterRecoByWaiting = (data: RecoType[], id?: string) =>
  data.filter(
    ({ answers }) =>
      answers.filter(
        ({ books, sellerId }) => sellerId === id && books.length === 0,
      ).length > 0,
  );
