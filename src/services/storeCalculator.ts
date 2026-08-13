import { Ingredient, Supermarket } from '../types';
import { SUPERMARKETS } from '../data/recipes';

export function calculateStoreTotals(
  shoppingList: Ingredient[],
  servingsCount: number,
  mode: 'best-price' | 'nearest'
): Supermarket[] {
  const multiplier = servingsCount / 2;
  const activeItems = shoppingList.filter(item => !item.checked);

  const baseTotal = activeItems.reduce((acc, item) => acc + (item.basePrice * multiplier), 0);

  const stores = SUPERMARKETS.map(store => {
    const totalCost = Math.round(baseTotal * store.priceMultiplier);
    return {
      ...store,
      totalCost: totalCost > 0 ? totalCost : 0
    };
  });

  if (mode === 'best-price') {
    stores.sort((a, b) => (a.totalCost || 0) - (b.totalCost || 0));
  } else {
    stores.sort((a, b) => a.distanceMeters - b.distanceMeters);
  }

  return stores;
}
