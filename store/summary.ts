'use client';

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type SummaryState = {
  result: any;
  loading: boolean;
  setResult: (data: any) => void;
  setLoading: (state: boolean) => void;
  reset: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

// export const useSummaryStore = create<SummaryState>((set) => ({
//   result: null,
//   loading: false,
//   setResult: (data: any) => set({ result: data }),
//   setLoading: (state: any) => set({ loading: state }),
//   reset: () => set({ result: null, loading: false }),
// }));

export const useSummaryStore = create<SummaryState>()(
  devtools(
    persist(
      (set) => ({
        result: null,
        loading: false,
        setResult: (data: any) => set({ result: data }),
        setLoading: (loading: any) => set({ loading }),
        reset: () => set({ result: null, loading: false }),
        hasHydrated: false,
        setHasHydrated: (value: any) => set({ hasHydrated: value }),
      }),
      {
        name: 'summary-storage', // name of localStorage key
        onRehydrateStorage: () => (state: any) => {
          state.hasHydrated = true;
        }
      }
    ),
    {
      name: 'SummaryStore', // for Redux devtools tab
    }
  )
);