/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { server } = await import('../mocks/server.ts');
    server.listen();
  }
}
