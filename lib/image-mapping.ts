// Image mapping utility for replacing placeholder images with real food images

export const getFoodImage = (itemName: string, category?: string): string => {
  const name = itemName.toLowerCase();
  
  // Direct matches for specific dishes
  if (name.includes('hakka') || name.includes('noodles')) {
    return '/hakka-noodles.png';
  }
  if (name.includes('schezwan')) {
    return '/noodles.png';
  }
  if (name.includes('momos') && (name.includes('veg') || !name.includes('chicken'))) {
    return '/veg-momos.png';
  }
  if (name.includes('momos') && name.includes('chicken')) {
    return '/momos.png';
  }
  if (name.includes('fried rice') || name.includes('rice')) {
    return '/fried-rice.png';
  }
  if (name.includes('chilli paneer') || name.includes('paneer')) {
    return '/chilli-paneer.png';
  }
  if (name.includes('soup') || name.includes('manchow')) {
    return '/hot-and-sour-soup.png';
  }
  if (name.includes('combo') || name.includes('delight')) {
    return '/meal-combo.png';
  }
  
  // Category-based fallbacks
  if (category) {
    const cat = category.toLowerCase();
    if (cat === 'noodles') return '/noodles.png';
    if (cat === 'momos') return '/veg-momos.png';
    if (cat === 'rice') return '/fried-rice.png';
    if (cat === 'starters') return '/chilli-paneer.png';
    if (cat === 'soups') return '/hot-and-sour-soup.png';
    if (cat === 'combos') return '/meal-combo.png';
  }
  
  // Default fallback
  return '/dish.png';
};

export const getCategoryImage = (category: string): string => {
  const cat = category.toLowerCase();
  
  switch (cat) {
    case 'noodles':
      return '/noodles.png';
    case 'momos':
      return '/veg-momos.png';
    case 'rice':
      return '/fried-rice.png';
    case 'starters':
      return '/chilli-paneer.png';
    case 'soups':
      return '/hot-and-sour-soup.png';
    case 'combos':
      return '/meal-combo.png';
    default:
      return '/dish.png';
  }
};

export const getPopularDishImage = (): string => {
  return '/popular-dish.png';
};
