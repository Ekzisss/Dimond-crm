/**
 * Вычисляет приоритет сделки на основе суммы
 * @param amount - Сумма сделки в рублях
 * @returns Приоритет сделки: 'low', 'medium' или 'high'
 */
export const getDealPriority = (amount: number): 'low' | 'medium' | 'high' => {
  if (amount >= 500000) return 'high';
  if (amount >= 100000) return 'medium';
  return 'low';
};
