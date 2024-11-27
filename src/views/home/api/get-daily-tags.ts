import { redis } from '@/src/shared/api/redis/client';
import { recipeCategoriesKey } from '@/src/shared/api/redis/keys';

interface Tag {
  tag: string;
  title: string;
}

async function getDailyTags(): Promise<Array<Tag>> {
  const data = (await redis.get(recipeCategoriesKey)) as Array<Tag>;
  return data ?? [];
}

export { getDailyTags };
