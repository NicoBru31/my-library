import { PropsWithChildren } from 'react';
import Head from 'next/head';
import Menu from '../menu/Menu';

const Layout = ({ children }: PropsWithChildren<unknown>) => (
  <div className='background'>
    <Head>
      <title>Liber</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Menu />
    {children}
  </div>
);

export default Layout;
