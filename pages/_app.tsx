import { ChakraProvider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import Layout from '../components/facc/Layout';
import AlertProvider from '../providers/AlertProvider';
import LoaderProvider from '../providers/LoaderProvider';
import SessionProvider from '../providers/SessionProvider';
import '../styles/globals.css';
import '../styles/tailwind.css';
import { pageVariants } from '../variants';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps, router }: AppProps) => (
  <motion.div
    animate='pageAnimate'
    initial='pageInitial'
    key={router.route}
    variants={pageVariants}
  >
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
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
      </Hydrate>
    </QueryClientProvider>
  </motion.div>
);

export default MyApp;
