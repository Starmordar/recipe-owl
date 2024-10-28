import { storeAuthResults } from '@/src/entities/session';

export async function GET(request: Request): Promise<Response> {
  return storeAuthResults(request);
}
