const cookiesOptions = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  maxAge: 60 * 10,
  sameSite: 'lax',
} as const;

export { cookiesOptions };
