import { ChakraProvider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Layout from '../components/facc/Layout';
import AlertProvider from '../providers/AlertProvider';
import LoaderProvider from '../providers/LoaderProvider';
import RecoProvider from '../providers/RecoProvider';
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
                <RecoProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </RecoProvider>
              </LoaderProvider>
            </AlertProvider>
          </SessionProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  </motion.div>
);

export default MyApp;
