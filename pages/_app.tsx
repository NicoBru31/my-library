import { AppProps } from 'next/dist/next-server/lib/router/router';
import Layout from '../components/facc/Layout';
import '../styles/tailwind.css';
import '../styles/globals.css';
import SessionProvider from '../providers/SessionProvider';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SessionProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
);

export default MyApp;
