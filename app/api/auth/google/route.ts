import { redirectToGoogleURL } from '@/entities/session';

export async function GET() {
  return redirectToGoogleURL();
}
