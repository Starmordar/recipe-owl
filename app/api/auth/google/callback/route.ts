import { storeAuthResults } from '@/src/shared/api/auth';

export async function GET(request: Request): Promise<Response> {
  return storeAuthResults(request);
}
