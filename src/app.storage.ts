import { AsyncLocalStorage } from 'async_hooks';

export class Store {
  constructor(public id: number) {}
}

export const storage = new AsyncLocalStorage<Store>();
