import { Google } from 'arctic';

const google = new Google(
  process.env.AUTH_GOOGLE_ID,
  process.env.AUTH_GOOGLE_SECRET,
  'http://localhost:3000/api/auth/google/callback',
);

const scopes = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

export { google, scopes };
