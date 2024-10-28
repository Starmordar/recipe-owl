import { redirectToGoogleURL } from '@/src/entities/session';

export async function GET() {
  return redirectToGoogleURL();
}
