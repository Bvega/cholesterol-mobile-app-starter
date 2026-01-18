import planJson from '../data/plan_week_01.json';
import type { PlanWeek } from '../types/plan';

/**
 * Source of truth for the plan.
 * In MVP we ship a single bundled JSON file.
 * Later, this can be swapped for remote fetch or user-imported plans.
 */
export const loadPlanWeek = (): PlanWeek => {
  return planJson as unknown as PlanWeek;
};
