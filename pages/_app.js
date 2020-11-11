import { Provider } from 'next-auth/client';
import Layout from '../components/facc/Layout';
import '../styles/tailwind.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <Provider session={pageProps.session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default MyApp;
