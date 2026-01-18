export type MealSlot = 'breakfast' | 'lunch' | 'dinner';

export type Meal = {
  mealId: string;
  title: string; // Desayuno / Comida / Cena
  description: string; // Human-friendly description from the source plan
};

export type PlanDay = {
  dayId: string; // mon..sun
  dayName: string; // Lunes..Domingo
  meals: Record<MealSlot, Meal>;
  tips: string[];
};

export type IngredientCategory =
  | 'Frutas'
  | 'Verduras'
  | 'Proteínas'
  | 'Cereales/Integrales'
  | 'Lácteos'
  | 'Otros';

export type Ingredient = {
  ingredientId: string;
  name: string;
  category: IngredientCategory;
};

export type PlanWeek = {
  weekId: string;
  title: string;
  patientProfile: {
    sex: 'female' | 'male' | 'other';
    age: number;
    weightLb: number;
    weightKg: number;
  };
  createdDate: string; // ISO date
  kcalTarget: { min: number; max: number };
  days: PlanDay[];
  additionalTips: string[];
  ingredientsCatalog: Ingredient[];
};
