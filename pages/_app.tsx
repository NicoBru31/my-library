import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/facc/Layout';
import '../styles/tailwind.css';
import '../styles/globals.css';
import SessionProvider from '../providers/SessionProvider';
import AlertProvider from '../providers/AlertProvider';
import LoaderProvider from '../providers/LoaderProvider';
import { motion } from 'framer-motion';
import { pageVariants } from '../variants';

const MyApp = ({ Component, pageProps, router }: AppProps) => (
  <motion.div
    animate='pageAnimate'
    initial='pageInitial'
    key={router.route}
    variants={pageVariants}
  >
    <ChakraProvider>
      <SessionProvider>
        <AlertProvider>
          <LoaderProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LoaderProvider>
        </AlertProvider>
      </SessionProvider>
    </ChakraProvider>
  </motion.div>
);

export default MyApp;
