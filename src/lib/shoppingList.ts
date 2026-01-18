import type { Ingredient, PlanDay, MealSlot, PlanWeek } from '../types/plan';

export type ShoppingListItem = {
  ingredientId: string;
  name: string;
  category: Ingredient['category'];
  count: number; // MVP: count occurrences (since plan doesn't include quantities)
};

const SLOTS: MealSlot[] = ['breakfast', 'lunch', 'dinner'];

/**
 * MVP strategy:
 * - We don't have quantities in the source plan.
 * - We approximate a shopping list by counting ingredient mentions.
 * Best practice: later replace with structured meal items + quantities.
 */
export function buildShoppingList(week: PlanWeek, selectedDayIds: string[]): ShoppingListItem[] {
  const daySet = new Set(selectedDayIds);
  const days = week.days.filter((d) => daySet.has(d.dayId));

  // Pre-index ingredients by name keyword (lowercase)
  const ingredientIndex = week.ingredientsCatalog
    .map((ing) => ({
      ing,
      keyword: ing.name.toLowerCase().split('(')[0].trim(),
    }))
    .sort((a, b) => b.keyword.length - a.keyword.length); // match longer phrases first

  const counts = new Map<string, number>();

  const scanText = (text: string) => {
    const t = text.toLowerCase();
    for (const { ing, keyword } of ingredientIndex) {
      // Simple includes check; safe + predictable for MVP.
      if (keyword && t.includes(keyword)) {
        counts.set(ing.ingredientId, (counts.get(ing.ingredientId) ?? 0) + 1);
      }
    }
  };

  for (const day of days) {
    for (const slot of SLOTS) {
      scanText(day.meals[slot].description);
    }
  }

  const idToIngredient = new Map(week.ingredientsCatalog.map((i) => [i.ingredientId, i] as const));

  const items: ShoppingListItem[] = Array.from(counts.entries()).map(([ingredientId, count]) => {
    const ing = idToIngredient.get(ingredientId)!;
    return {
      ingredientId,
      name: ing.name,
      category: ing.category,
      count,
    };
  });

  // Sort by category then name for easy shopping
  items.sort((a, b) => {
    if (a.category === b.category) return a.name.localeCompare(b.name);
    return a.category.localeCompare(b.category);
  });

  return items;
}

export function groupShoppingList(items: ShoppingListItem[]): Record<string, ShoppingListItem[]> {
  return items.reduce<Record<string, ShoppingListItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
}
