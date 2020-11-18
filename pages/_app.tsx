import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/facc/Layout';
import '../styles/tailwind.css';
import '../styles/globals.css';
import SessionProvider from '../providers/SessionProvider';
import AlertProvider from '../providers/AlertProvider';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <SessionProvider>
      <AlertProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AlertProvider>
    </SessionProvider>
  </ChakraProvider>
);

export default MyApp;
