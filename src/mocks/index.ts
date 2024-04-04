/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
export async function initMsw() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    await worker.start();
  }
}
