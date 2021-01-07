import { RecoType } from '../types';

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
