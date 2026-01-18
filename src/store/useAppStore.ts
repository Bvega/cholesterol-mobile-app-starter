import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Stores user interaction state:
 * - meal completion (per dayId + mealId)
 * - shopping list checks
 * Best practice: keep business data (the plan) immutable and versioned.
 */

type CompletionKey = string; // `${dayId}:${mealId}`

type AppState = {
  largeTextMode: boolean;
  toggledMeals: Record<CompletionKey, boolean>;
  shoppingChecked: Record<string, boolean>; // ingredientId -> checked

  setLargeTextMode: (value: boolean) => void;
  toggleMeal: (dayId: string, mealId: string) => void;
  toggleShoppingItem: (ingredientId: string) => void;
  resetShoppingChecks: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      largeTextMode: false,
      toggledMeals: {},
      shoppingChecked: {},

      setLargeTextMode: (value) => set({ largeTextMode: value }),

      toggleMeal: (dayId, mealId) => {
        const key = `${dayId}:${mealId}`;
        const current = get().toggledMeals[key] ?? false;
        set({ toggledMeals: { ...get().toggledMeals, [key]: !current } });
      },

      toggleShoppingItem: (ingredientId) => {
        const current = get().shoppingChecked[ingredientId] ?? false;
        set({ shoppingChecked: { ...get().shoppingChecked, [ingredientId]: !current } });
      },

      resetShoppingChecks: () => set({ shoppingChecked: {} }),
    }),
    {
      name: 'cholesterol-app-store',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
