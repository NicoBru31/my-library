import Layout from '../components/facc/Layout';
import '../styles/tailwind.css';
import '../styles/globals.css';
import SessionProvider from '../providers/SessionProvider';

const MyApp = ({ Component, pageProps }) => (
  <SessionProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
);

export default MyApp;
