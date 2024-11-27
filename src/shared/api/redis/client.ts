import { Redis } from '@upstash/redis';

const redisClient = () => {
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
};

declare global {
  // eslint-disable-next-line no-var
  var redisGlobal: undefined | ReturnType<typeof redisClient>;
}

const redis = globalThis.redisGlobal ?? redisClient();
if (process.env.NODE_ENV !== 'production') globalThis.redisGlobal = redis;

export { redis };
