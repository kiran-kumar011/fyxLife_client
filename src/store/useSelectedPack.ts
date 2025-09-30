import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { Goal, Pack } from './types';
import { mmkvStorage, PERSIST_KEY } from '../storage/mmkvStorage';

/** -------- Store shape -------- */
type SelectedPackState = {
  selectedDate: string | null; // YYYY-MM-DD (local)
  selectedPack: Pack | null;
  rehydrated: boolean;

  // actions
  selectPackForToday: (dateIso: string, pack: Pack) => void;
  clearSelectedPack: () => void;
  updateGoal: (goalId: string, patch: Partial<Goal>) => void;
  setRehydrated: (v: boolean) => void;
};

export const useSelectedPackStore = create<SelectedPackState>()(
  persist(
    (set, get) => ({
      selectedDate: null,
      selectedPack: null,
      rehydrated: false,

      selectPackForToday: (dateIso, pack) => {
        set(() => ({
          selectedDate: dateIso,
          selectedPack: {
            ...pack,
            updatedAt: new Date().toISOString(),
          },
        }));
      },

      setRehydrated: (v: boolean) => set(() => ({ rehydrated: v })),

      clearSelectedPack: () =>
        set(() => ({ selectedDate: null, selectedPack: null })),

      updateGoal: (goalId: string, patch: Partial<Goal>) =>
        set(state => {
          // guard: if no selectedPack, do nothing
          if (!state.selectedPack) {
            return {};
          }
          // produce a new pack immutably
          const newPack = produce(state.selectedPack, draft => {
            const idx = draft.goals.findIndex(g => g._id === goalId);
            if (idx === -1) {
              return;
            }
            draft.goals[idx] = { ...draft.goals[idx], ...patch };
            draft.updatedAt = new Date().toISOString();
          });
          // return partial state update
          return { selectedPack: newPack };
        }),
    }),
    {
      name: PERSIST_KEY,
      storage: createJSONStorage(() => mmkvStorage as any),
      partialize: state => ({
        selectedDate: state.selectedDate,
        selectedPack: state.selectedPack,
      }),
      version: 1,
      onRehydrateStorage: () => (persistedState, error) => {
        // persistedState is the restored partial state (or undefined)
        if (error) {
          console.warn('[persist] rehydrate error:', error);
          // still mark rehydrated = true so the app can proceed
          useSelectedPackStore.setState({ rehydrated: true });
          return;
        }
        // rehydration finished successfully (or nothing to restore)
        useSelectedPackStore.setState({ rehydrated: true });
      },
    },
  ),
);
