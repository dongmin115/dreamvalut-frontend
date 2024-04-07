/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

const QueryProviders: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default QueryProviders;
