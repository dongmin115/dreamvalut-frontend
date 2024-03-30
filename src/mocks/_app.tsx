/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'undefined') {
      (async () => {
        const { server } = await import('./server');
        server.listen();
      })();
    } else {
      (async () => {
        const { worker } = await import('./browser');
        worker.start();
      })();
    }
  }
  return <Component {...pageProps} />;
}
