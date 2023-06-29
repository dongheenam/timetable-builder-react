import { StoreApi, UseBoundStore } from 'zustand';

// creates selectors for a Zustand store
// ref: https://github.com/pmndrs/zustand/blob/main/docs/guides/auto-generating-selectors.md
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // we not know the states and actions of the store
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};