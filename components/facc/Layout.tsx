import { PropsWithChildren } from 'react';
import Head from 'next/head';

const Layout = ({ children }: PropsWithChildren<unknown>) => (
  <div>
    <Head>
      <title>Ma librairie en ligne</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    {children}
  </div>
);

export default Layout;
