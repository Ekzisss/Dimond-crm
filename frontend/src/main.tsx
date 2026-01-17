import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@shared/api/apollo';

import './index.css';
import { App } from './app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
