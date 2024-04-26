import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export function createContext({ req, res }: CreateExpressContextOptions) {
  const user = { name: req.headers.username ?? 'anonymous' };

  return { req, res, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
