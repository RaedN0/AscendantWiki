import { handleAuth, handleCallback, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

const handler = handleAuth({
  login: handleLogin({
    returnTo: '/'
  }),
  logout: handleLogout({
    returnTo: '/'
  }),
  callback: handleCallback({
    afterCallback: (req, session) => {
      return session;
    }
  })
});

export { handler as GET, handler as POST };