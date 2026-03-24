import type { ToArray_F } from './types';

export const toArray: ToArray_F = value => {
  const check1 = value === undefined || value === null;

  if (check1) return [];
  if (Array.isArray(value)) return value;

  return [value];
};
