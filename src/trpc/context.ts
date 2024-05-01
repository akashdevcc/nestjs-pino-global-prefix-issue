interface CreateInnerContextOptions {
  username: string;
}

export function createInnerContext({ username }: CreateInnerContextOptions) {
  const user = { name: username ?? 'anonymous' };
  return { user };
}

export type Context = Awaited<ReturnType<typeof createInnerContext>>;
