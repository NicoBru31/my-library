import { PropsWithChildren } from 'react';
import Head from 'next/head';
import Menu from '../menu/Menu';

const Layout = ({ children }: PropsWithChildren<unknown>) => (
  <div className='background'>
    <Head>
      <title>Liber</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
      <link rel='icon' href='/favicon.png' type='image/x-icon' />
    </Head>
    <Menu />
    <div className='p-6 pt-20 min-h-screen'>{children}</div>
  </div>
);

export default Layout;
