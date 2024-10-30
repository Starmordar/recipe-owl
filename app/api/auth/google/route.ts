import { redirectToGoogleURL } from '@/src/shared/api/auth';

export async function GET() {
  return redirectToGoogleURL();
}
