import { Ingredient, Supermarket } from '../types';
import { SUPERMARKETS } from '../data/recipes';

export interface SupermarketBasketResult {
  storeId: string;
  storeName: string;
  totalCost: number;
  savings: number;
  itemCount: number;
  lastUpdated: string;
}

/**
 * Calculates the exact dynamic price for a single shopping cart item
 * properly accounting for quantity changes (unit price * current qty)
 * and recipe servings scaling.
 */
export function getItemDynamicPrice(item: Ingredient, servingsCount: number): number {
  if (item.isDiscrete) {
    // Standalone or promo product: item.basePrice is price per 1 unit
    const q = item.qty || 1;
    return Math.round(item.basePrice * q * 100) / 100;
  }

  // Recipe ingredient:
  // mult is (servingsCount / 2)
  const mult = servingsCount / 2;
  const initialQty = item.initialBaseQty && item.initialBaseQty > 0 ? item.initialBaseQty : (item.qty || 1);
  const currentBaseQty = item.baseQty !== undefined ? item.baseQty : item.qty;

  // unitPrice is price per 1 unit of base quantity
  const unitPrice = item.basePrice / initialQty;
  const rawPrice = unitPrice * currentBaseQty * mult;

  return Math.max(0.10, Math.round(rawPrice * 100) / 100);
}

/**
 * Calculates the total basket cost for all unchecked items in the cart
 */
export function getCartActiveTotal(shoppingList: Ingredient[], servingsCount: number): number {
  const activeItems = shoppingList.filter(item => !item.checked);
  const sum = activeItems.reduce((acc, item) => acc + getItemDynamicPrice(item, servingsCount), 0);
  return Math.round(sum * 100) / 100;
}

/**
 * Service to query live pricing from the API backend with fallback to indexed Polish benchmarks
 */
export async function fetchLiveSupermarketPricing(
  shoppingList: Ingredient[],
  servingsCount: number
): Promise<{ success: boolean; timestamp: string; results?: SupermarketBasketResult[] }> {
  try {
    const activeItems = shoppingList.filter(item => !item.checked).map(item => ({
      name: item.name.pl,
      qty: item.isDiscrete ? item.qty : ((item.baseQty ?? item.qty) * (servingsCount / 2)),
      unit: item.unit.pl,
      price: getItemDynamicPrice(item, servingsCount)
    }));

    const res = await fetch('/api/supermarket-prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: activeItems, servingsCount })
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, timestamp: data.timestamp || new Date().toISOString(), results: data.results };
    }
  } catch (err) {
    console.warn('[PriceService] Live price API unavailable, using calibrated local index:', err);
  }

  // Local fallback calculation
  const total = getCartActiveTotal(shoppingList, servingsCount);
  const results: SupermarketBasketResult[] = SUPERMARKETS.map(store => {
    const storeCost = Math.round(total * store.priceMultiplier * 100) / 100;
    return {
      storeId: store.id,
      storeName: store.name,
      totalCost: storeCost,
      savings: Math.max(0, Math.round((total - storeCost) * 100) / 100),
      itemCount: shoppingList.filter(i => !i.checked).length,
      lastUpdated: new Date().toISOString()
    };
  });

  return { success: true, timestamp: new Date().toISOString(), results };
}
