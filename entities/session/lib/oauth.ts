import { Google } from 'arctic';

const google = new Google(
  process.env.AUTH_GOOGLE_ID,
  process.env.AUTH_GOOGLE_SECRET,
  process.env.AUTH_GOOGLE_REDIRECT_URL,
);

const scopes = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

export { google, scopes };
