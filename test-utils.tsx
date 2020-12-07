import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import SessionProvider from './providers/SessionProvider';
import AlertProvider from './providers/AlertProvider';
import LoaderProvider from './providers/LoaderProvider';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({ query: {}, push: () => {} }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const AllTheProviders = ({ children }) => (
  <ChakraProvider>
    <SessionProvider>
      <AlertProvider>
        <LoaderProvider>{children}</LoaderProvider>
      </AlertProvider>
    </SessionProvider>
  </ChakraProvider>
);

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
