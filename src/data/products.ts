import type { Product, Review } from "../types";
import { categories } from "./categories";
import { productPhoto } from "../lib/productImages";

interface Seed {
  name: string;
  brand: string;
  sub: string;
  unit: string;
  price: number;
  organic?: boolean;
  tags?: string[];
}

const SEEDS: Record<string, Seed[]> = {
  "fruits-vegetables": [
    { name: "Organic Bananas", brand: "Verdant Farms", sub: "Fresh Fruit", unit: "per lb", price: 0.79, organic: true },
    { name: "Hass Avocados", brand: "Sunridge", sub: "Fresh Fruit", unit: "each", price: 1.49 },
    { name: "Honeycrisp Apples", brand: "Orchard Row", sub: "Fresh Fruit", unit: "per lb", price: 2.99 },
    { name: "Seedless Red Grapes", brand: "Sunridge", sub: "Fresh Fruit", unit: "per lb", price: 3.49 },
    { name: "Baby Spinach", brand: "Verdant Farms", sub: "Salad & Greens", unit: "5 oz bag", price: 3.29, organic: true },
    { name: "Vine Tomatoes", brand: "Sunridge", sub: "Fresh Vegetables", unit: "per lb", price: 2.49 },
    { name: "Broccoli Crowns", brand: "Orchard Row", sub: "Fresh Vegetables", unit: "each", price: 2.19 },
    { name: "Yellow Onions", brand: "Verdant Farms", sub: "Fresh Vegetables", unit: "3 lb bag", price: 3.99 },
    { name: "Fresh Basil", brand: "Herb & Co.", sub: "Herbs", unit: "bunch", price: 2.29 },
    { name: "Organic Carrots", brand: "Verdant Farms", sub: "Fresh Vegetables", unit: "2 lb bag", price: 2.79, organic: true },
    { name: "Romaine Hearts", brand: "Sunridge", sub: "Salad & Greens", unit: "3 pack", price: 3.99 },
    { name: "Cavendish Bananas Value Pack", brand: "Orchard Row", sub: "Fresh Fruit", unit: "3 lb", price: 2.29 },
  ],
  "meat-poultry": [
    { name: "Boneless Chicken Breast", brand: "Pasture & Co.", sub: "Chicken", unit: "per lb", price: 5.49 },
    { name: "Grass-Fed Ground Beef 85/15", brand: "Highland Ranch", sub: "Beef", unit: "per lb", price: 7.99 },
    { name: "Ribeye Steak", brand: "Highland Ranch", sub: "Beef", unit: "per lb", price: 15.99 },
    { name: "Pork Tenderloin", brand: "Pasture & Co.", sub: "Pork", unit: "per lb", price: 6.49 },
    { name: "Free-Range Whole Chicken", brand: "Pasture & Co.", sub: "Chicken", unit: "per lb", price: 3.99 },
    { name: "Lamb Chops", brand: "Highland Ranch", sub: "Lamb", unit: "per lb", price: 13.49 },
    { name: "Smoked Deli Ham", brand: "Meadow Deli", sub: "Deli & Cured", unit: "8 oz", price: 5.29 },
    { name: "Applewood Bacon", brand: "Meadow Deli", sub: "Deli & Cured", unit: "12 oz", price: 6.79 },
    { name: "Chicken Thighs", brand: "Pasture & Co.", sub: "Chicken", unit: "per lb", price: 3.29 },
  ],
  seafood: [
    { name: "Wild-Caught Salmon Fillet", brand: "Tidewater", sub: "Fish", unit: "per lb", price: 12.99 },
    { name: "Jumbo Shrimp, Peeled", brand: "Tidewater", sub: "Shellfish", unit: "1 lb bag", price: 10.99 },
    { name: "Ahi Tuna Steaks", brand: "Blue Harbor", sub: "Fish", unit: "per lb", price: 14.49 },
    { name: "Sea Scallops", brand: "Blue Harbor", sub: "Shellfish", unit: "per lb", price: 18.99 },
    { name: "Smoked Salmon", brand: "Tidewater", sub: "Smoked & Cured", unit: "4 oz", price: 7.99 },
    { name: "Cod Fillet", brand: "Blue Harbor", sub: "Fish", unit: "per lb", price: 9.49 },
    { name: "Mussels", brand: "Tidewater", sub: "Shellfish", unit: "2 lb bag", price: 6.99 },
  ],
  "dairy-eggs": [
    { name: "Whole Milk", brand: "Meadowbrook", sub: "Milk", unit: "1 gallon", price: 3.99 },
    { name: "Free-Range Large Eggs", brand: "Sunny Coop", sub: "Eggs", unit: "dozen", price: 4.49 },
    { name: "Sharp Cheddar Cheese", brand: "Meadowbrook", sub: "Cheese", unit: "8 oz block", price: 4.79 },
    { name: "Plain Greek Yoghurt", brand: "Golden Pastures", sub: "Yoghurt", unit: "32 oz", price: 4.99 },
    { name: "Unsalted Butter", brand: "Meadowbrook", sub: "Butter & Cream", unit: "1 lb", price: 4.29 },
    { name: "Almond Milk, Unsweetened", brand: "Northfield", sub: "Milk", unit: "half gallon", price: 3.49 },
    { name: "Mozzarella Shredded", brand: "Meadowbrook", sub: "Cheese", unit: "8 oz", price: 3.99 },
    { name: "Vanilla Bean Yoghurt", brand: "Golden Pastures", sub: "Yoghurt", unit: "6 pack", price: 5.49 },
    { name: "Heavy Whipping Cream", brand: "Meadowbrook", sub: "Butter & Cream", unit: "16 oz", price: 3.29 },
    { name: "Parmesan Wedge", brand: "Northfield", sub: "Cheese", unit: "per lb", price: 12.99 },
  ],
  bakery: [
    { name: "Sourdough Boule", brand: "Hearth & Oats", sub: "Bread", unit: "each", price: 4.99 },
    { name: "Whole Wheat Sandwich Bread", brand: "Hearth & Oats", sub: "Bread", unit: "24 oz loaf", price: 3.79 },
    { name: "Butter Croissants", brand: "Hearth & Oats", sub: "Pastries", unit: "4 pack", price: 5.49 },
    { name: "Brioche Burger Buns", brand: "Millstone", sub: "Rolls & Buns", unit: "6 pack", price: 3.99 },
    { name: "Chocolate Chip Muffins", brand: "Millstone", sub: "Pastries", unit: "4 pack", price: 4.49 },
    { name: "Classic Bagels", brand: "Hearth & Oats", sub: "Bread", unit: "6 pack", price: 3.49 },
    { name: "Carrot Cake Slice", brand: "Millstone", sub: "Cakes", unit: "each", price: 4.29 },
  ],
  "frozen-foods": [
    { name: "Wild Blueberries, Frozen", brand: "Northern Harvest", sub: "Frozen Vegetables", unit: "12 oz", price: 4.29 },
    { name: "Mixed Vegetable Medley", brand: "Northern Harvest", sub: "Frozen Vegetables", unit: "16 oz", price: 2.99 },
    { name: "Margherita Pizza", brand: "Trattoria Table", sub: "Frozen Meals", unit: "each", price: 6.99 },
    { name: "Vanilla Bean Ice Cream", brand: "Creamery Lane", sub: "Ice Cream", unit: "1.5 qt", price: 5.99 },
    { name: "Chicken Pot Pie", brand: "Homestead Kitchen", sub: "Frozen Meals", unit: "each", price: 4.49 },
    { name: "Mozzarella Sticks", brand: "Trattoria Table", sub: "Frozen Snacks", unit: "12 oz", price: 4.99 },
    { name: "Frozen Mango Chunks", brand: "Northern Harvest", sub: "Frozen Vegetables", unit: "16 oz", price: 3.99 },
    { name: "Chocolate Fudge Ice Cream", brand: "Creamery Lane", sub: "Ice Cream", unit: "1.5 qt", price: 5.99 },
  ],
  "pantry-grocery": [
    { name: "Extra Virgin Olive Oil", brand: "Grove & Vine", sub: "Oils & Vinegar", unit: "500ml", price: 9.99 },
    { name: "Long Grain Jasmine Rice", brand: "Harvest Table", sub: "Rice & Grains", unit: "5 lb", price: 7.49 },
    { name: "Penne Pasta", brand: "Molino", sub: "Pasta", unit: "16 oz", price: 1.99 },
    { name: "Crushed Tomatoes", brand: "Harvest Table", sub: "Canned Goods", unit: "28 oz can", price: 2.49 },
    { name: "Raw Honey", brand: "Grove & Vine", sub: "Condiments", unit: "12 oz", price: 6.99 },
    { name: "Balsamic Vinegar", brand: "Grove & Vine", sub: "Oils & Vinegar", unit: "375ml", price: 5.99 },
    { name: "Quinoa", brand: "Harvest Table", sub: "Rice & Grains", unit: "2 lb", price: 6.49 },
    { name: "Dijon Mustard", brand: "Molino", sub: "Condiments", unit: "8 oz", price: 3.29 },
    { name: "Black Beans", brand: "Harvest Table", sub: "Canned Goods", unit: "15 oz can", price: 1.29 },
    { name: "Spaghetti", brand: "Molino", sub: "Pasta", unit: "16 oz", price: 1.89 },
  ],
  beverages: [
    { name: "Colombian Ground Coffee", brand: "Roast & Co.", sub: "Coffee", unit: "12 oz", price: 8.99 },
    { name: "Earl Grey Tea Bags", brand: "Leaf & Bloom", sub: "Tea", unit: "20 count", price: 4.49 },
    { name: "Cold-Pressed Orange Juice", brand: "Citrus House", sub: "Juices", unit: "52 oz", price: 5.99 },
    { name: "Sparkling Water, Lime", brand: "Alpine Springs", sub: "Water", unit: "12 pack", price: 5.49 },
    { name: "Green Tea Bags", brand: "Leaf & Bloom", sub: "Tea", unit: "20 count", price: 4.29 },
    { name: "Cola Classic", brand: "Fizz Co.", sub: "Soft Drinks", unit: "12 pack cans", price: 5.99 },
    { name: "Cranberry Juice Cocktail", brand: "Citrus House", sub: "Juices", unit: "64 oz", price: 4.99 },
    { name: "Spring Water", brand: "Alpine Springs", sub: "Water", unit: "24 pack", price: 4.49 },
    { name: "Espresso Roast Beans", brand: "Roast & Co.", sub: "Coffee", unit: "12 oz", price: 10.99 },
  ],
  snacks: [
    { name: "Sea Salt Kettle Chips", brand: "Golden Crisp", sub: "Chips & Crisps", unit: "8 oz", price: 3.49 },
    { name: "Roasted Almonds", brand: "Nutwell", sub: "Nuts & Seeds", unit: "10 oz", price: 6.99 },
    { name: "Dark Chocolate Bar 70%", brand: "Cacao & Co.", sub: "Chocolate", unit: "3.5 oz", price: 3.99 },
    { name: "Whole Wheat Crackers", brand: "Millstone", sub: "Crackers", unit: "8.5 oz", price: 3.29 },
    { name: "Mixed Nuts, Unsalted", brand: "Nutwell", sub: "Nuts & Seeds", unit: "12 oz", price: 8.49 },
    { name: "Tortilla Chips", brand: "Golden Crisp", sub: "Chips & Crisps", unit: "12 oz", price: 3.79 },
    { name: "Milk Chocolate Almonds", brand: "Cacao & Co.", sub: "Chocolate", unit: "8 oz", price: 5.49 },
    { name: "Water Crackers", brand: "Millstone", sub: "Crackers", unit: "4.4 oz", price: 3.49 },
  ],
  breakfast: [
    { name: "Rolled Oats", brand: "Harvest Table", sub: "Oats & Porridge", unit: "42 oz", price: 4.99 },
    { name: "Honey Nut Granola Cereal", brand: "Golden Crisp", sub: "Cereal", unit: "18 oz", price: 4.79 },
    { name: "Peanut Butter, Creamy", brand: "Nutwell", sub: "Spreads", unit: "16 oz", price: 4.49 },
    { name: "Strawberry Fruit Preserves", brand: "Grove & Vine", sub: "Spreads", unit: "12 oz", price: 3.99 },
    { name: "Buttermilk Pancake Mix", brand: "Millstone", sub: "Pancake & Waffle", unit: "32 oz", price: 3.49 },
    { name: "Maple Syrup", brand: "Northern Harvest", sub: "Pancake & Waffle", unit: "12 oz", price: 6.99 },
    { name: "Multigrain Cereal Flakes", brand: "Golden Crisp", sub: "Cereal", unit: "16 oz", price: 4.29 },
  ],
  "organic-natural": [
    { name: "Organic Kale Bunch", brand: "Verdant Farms", sub: "Organic Produce", unit: "each", price: 2.99, organic: true },
    { name: "Organic Quinoa", brand: "Harvest Table", sub: "Organic Pantry", unit: "2 lb", price: 7.99, organic: true },
    { name: "Organic Whole Milk", brand: "Meadowbrook", sub: "Organic Dairy", unit: "half gallon", price: 4.49, organic: true },
    { name: "Organic Extra Virgin Olive Oil", brand: "Grove & Vine", sub: "Organic Pantry", unit: "500ml", price: 12.99, organic: true },
    { name: "Organic Blueberries", brand: "Sunridge", sub: "Organic Produce", unit: "6 oz", price: 4.99, organic: true },
    { name: "Organic Free-Range Eggs", brand: "Sunny Coop", sub: "Organic Dairy", unit: "dozen", price: 5.99, organic: true },
    { name: "Organic Brown Rice", brand: "Harvest Table", sub: "Organic Pantry", unit: "3 lb", price: 6.49, organic: true },
  ],
  "baby-care": [
    { name: "Hypoallergenic Baby Diapers, Size 3", brand: "LittleNest", sub: "Diapers", unit: "36 count", price: 14.99 },
    { name: "Organic Baby Puree, Pear & Apple", brand: "LittleNest", sub: "Baby Food", unit: "4 oz x 4", price: 5.49, organic: true },
    { name: "Gentle Baby Lotion", brand: "LittleNest", sub: "Baby Skincare", unit: "8 oz", price: 6.99 },
    { name: "Baby Wipes, Fragrance Free", brand: "LittleNest", sub: "Diapers", unit: "80 count", price: 4.29 },
    { name: "Baby Bottles, 9 oz", brand: "LittleNest", sub: "Feeding", unit: "2 pack", price: 9.99 },
    { name: "Baby Oatmeal Cereal", brand: "LittleNest", sub: "Baby Food", unit: "8 oz", price: 3.99 },
  ],
  "personal-care": [
    { name: "Hydrating Face Moisturizer", brand: "Cedar & Sage", sub: "Skincare", unit: "1.7 oz", price: 12.99 },
    { name: "Argan Oil Shampoo", brand: "Cedar & Sage", sub: "Hair Care", unit: "12 oz", price: 8.49 },
    { name: "Whitening Toothpaste", brand: "Brightline", sub: "Oral Care", unit: "4.6 oz", price: 4.49 },
    { name: "Charcoal Body Wash", brand: "Cedar & Sage", sub: "Bath & Body", unit: "16 oz", price: 6.99 },
    { name: "Conditioner, Repair & Shine", brand: "Cedar & Sage", sub: "Hair Care", unit: "12 oz", price: 8.49 },
    { name: "Sensitive Skin Sunscreen SPF 50", brand: "Cedar & Sage", sub: "Skincare", unit: "3 oz", price: 13.99 },
  ],
  household: [
    { name: "Ultra-Soft Paper Towels", brand: "Homebase", sub: "Paper Products", unit: "6 rolls", price: 9.99 },
    { name: "Reusable Glass Food Containers", brand: "Homebase", sub: "Storage", unit: "5 pack", price: 19.99 },
    { name: "Non-Stick Frying Pan", brand: "Homebase", sub: "Kitchenware", unit: "10 inch", price: 24.99 },
    { name: "Bath Tissue, 2-Ply", brand: "Homebase", sub: "Paper Products", unit: "12 rolls", price: 8.99 },
    { name: "Laundry Detergent, Free & Clear", brand: "Homebase", sub: "Laundry", unit: "100 oz", price: 12.99 },
    { name: "Storage Bags, Resealable", brand: "Homebase", sub: "Storage", unit: "40 count", price: 4.99 },
  ],
  cleaning: [
    { name: "All-Purpose Cleaner Spray", brand: "PureShine", sub: "Surface Cleaners", unit: "32 oz", price: 4.99 },
    { name: "Dish Soap, Lemon", brand: "PureShine", sub: "Dish Care", unit: "24 oz", price: 3.49 },
    { name: "Scented Air Freshener", brand: "PureShine", sub: "Air Care", unit: "8 oz", price: 4.29 },
    { name: "Kitchen Trash Bags", brand: "Homebase", sub: "Trash Bags", unit: "40 count", price: 8.99 },
    { name: "Glass & Window Cleaner", brand: "PureShine", sub: "Surface Cleaners", unit: "32 oz", price: 4.49 },
    { name: "Dishwasher Detergent Pods", brand: "PureShine", sub: "Dish Care", unit: "30 count", price: 9.99 },
  ],
  "pet-care": [
    { name: "Dry Dog Food, Chicken & Rice", brand: "Loyal Bowl", sub: "Dog", unit: "15 lb", price: 24.99 },
    { name: "Grain-Free Cat Food", brand: "Loyal Bowl", sub: "Cat", unit: "12 lb", price: 21.99 },
    { name: "Dental Chew Treats", brand: "Loyal Bowl", sub: "Pet Treats", unit: "18 count", price: 8.99 },
    { name: "Cat Litter, Clumping", brand: "Loyal Bowl", sub: "Cat", unit: "20 lb", price: 14.99 },
    { name: "Dog Chew Toy", brand: "Loyal Bowl", sub: "Pet Accessories", unit: "each", price: 6.99 },
  ],
  "health-wellness": [
    { name: "Multivitamin Tablets", brand: "Wellspring", sub: "Vitamins", unit: "90 count", price: 13.99 },
    { name: "Vitamin C Chewables", brand: "Wellspring", sub: "Vitamins", unit: "60 count", price: 9.99 },
    { name: "First Aid Kit", brand: "Wellspring", sub: "First Aid", unit: "each", price: 16.99 },
    { name: "Omega-3 Fish Oil Softgels", brand: "Wellspring", sub: "Supplements", unit: "120 count", price: 17.99 },
    { name: "Probiotic Capsules", brand: "Wellspring", sub: "Supplements", unit: "30 count", price: 19.99 },
  ],
  "international-foods": [
    { name: "Jasmine Coconut Curry Sauce", brand: "Spice Route", sub: "Asian", unit: "14 oz", price: 4.49 },
    { name: "Kimchi, Traditional", brand: "Spice Route", sub: "Asian", unit: "16 oz", price: 6.49 },
    { name: "Extra Virgin Greek Olive Oil", brand: "Aegean Table", sub: "Mediterranean", unit: "500ml", price: 11.99 },
    { name: "Hummus, Roasted Red Pepper", brand: "Aegean Table", sub: "Mediterranean", unit: "10 oz", price: 4.29 },
    { name: "Corn Tortillas", brand: "Casa Fresca", sub: "Latin American", unit: "30 count", price: 3.49 },
    { name: "Salsa Verde", brand: "Casa Fresca", sub: "Latin American", unit: "16 oz", price: 3.99 },
    { name: "Belgian Waffle Cookies", brand: "Continental Pantry", sub: "European", unit: "8.8 oz", price: 4.99 },
  ],
};

const REVIEW_AUTHORS = ["Amelia R.", "James T.", "Priya S.", "Noah K.", "Isabella M.", "Lucas B.", "Chloe W.", "Ethan D.", "Sofia G.", "Mason L."];
const REVIEW_TITLES = ["Great quality", "Will buy again", "Fresh and delicious", "Exactly as described", "Good value", "Family favourite", "Better than the store brand"];
const REVIEW_BODIES = [
  "Consistently good quality and arrives well packaged. This has become a staple in our weekly order.",
  "Really happy with the freshness, tastes like it came straight from a local market.",
  "Good price for the quality. Delivery was fast and everything was well packed.",
  "Exactly what I expected. Will be reordering this every week from now on.",
  "Solid everyday choice, my whole family enjoys it and it never disappoints.",
];

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashStr(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) || 1;
}

function buildReviews(id: string, count: number): Review[] {
  const rnd = seededRandom(hashStr(id));
  return Array.from({ length: count }, (_, i) => {
    const rating = Math.max(3, Math.round(3 + rnd() * 2));
    return {
      id: `${id}-rev-${i}`,
      author: REVIEW_AUTHORS[Math.floor(rnd() * REVIEW_AUTHORS.length)],
      rating,
      date: new Date(Date.now() - Math.floor(rnd() * 90) * 86400000).toISOString(),
      title: REVIEW_TITLES[Math.floor(rnd() * REVIEW_TITLES.length)],
      body: REVIEW_BODIES[Math.floor(rnd() * REVIEW_BODIES.length)],
      verified: rnd() > 0.2,
    };
  });
}

function buildProducts(): Product[] {
  const products: Product[] = [];
  for (const category of categories) {
    const seeds = SEEDS[category.id] ?? [];
    seeds.forEach((seed, idx) => {
      const id = `${category.id}-${idx}`;
      const rnd = seededRandom(hashStr(id));
      const discountRoll = rnd();
      const hasDiscount = discountRoll < 0.32;
      const discountPct = hasDiscount ? [10, 15, 20, 25, 30][Math.floor(rnd() * 5)] : 0;
      const originalPrice = hasDiscount ? Math.round((seed.price / (1 - discountPct / 100)) * 100) / 100 : undefined;
      const rating = Math.round((3.6 + rnd() * 1.4) * 10) / 10;
      const reviewCount = 8 + Math.floor(rnd() * 240);
      const stock = Math.floor(rnd() * 140);
      const isNew = rnd() > 0.86;
      const featured = rnd() > 0.82;
      const image = productPhoto(seed.name, category.group);
      const gallery = [image, image, image];

      products.push({
        id,
        sku: `VM-${category.id.slice(0, 3).toUpperCase()}-${1000 + idx}`,
        name: seed.name,
        brand: seed.brand,
        categoryId: category.id,
        subcategory: seed.sub,
        description: `${seed.name} from ${seed.brand}, a customer favourite in ${category.name.toLowerCase()}.`,
        longDescription: `Sourced with care and quality-checked before it reaches your door. ${seed.name} is one of our most-loved picks in ${seed.sub.toLowerCase()}, chosen for its consistent quality, flavour and value. Perfect for everyday meals and special occasions alike.`,
        price: seed.price,
        originalPrice,
        unit: seed.unit,
        image,
        gallery,
        rating,
        reviewCount,
        reviews: buildReviews(id, Math.min(4, Math.max(2, Math.floor(reviewCount / 60)))),
        stock,
        reorderLevel: 20,
        tags: [...(seed.tags ?? []), ...(seed.organic ? ["organic"] : []), ...(isNew ? ["new"] : [])],
        organic: seed.organic,
        isNew,
        featured,
        nutrition: [
          { label: "Serving Size", value: seed.unit },
          { label: "Calories", value: `${60 + Math.floor(rnd() * 220)} kcal` },
          { label: "Protein", value: `${(rnd() * 12).toFixed(1)} g` },
          { label: "Total Fat", value: `${(rnd() * 10).toFixed(1)} g` },
          { label: "Carbohydrates", value: `${(rnd() * 30).toFixed(1)} g` },
        ],
        ingredients: `${seed.name} and select quality ingredients. See packaging for full ingredient list and allergen information.`,
      });
    });
  }
  return products;
}

export const products: Product[] = buildProducts();

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function productsByCategory(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}

export function relatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, count);
}

export function discountedProducts() {
  return products.filter((p) => p.originalPrice && p.originalPrice > p.price);
}

export function newProducts() {
  return products.filter((p) => p.isNew);
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
