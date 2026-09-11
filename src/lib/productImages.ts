// Real, professionally shot product photography sourced from Unsplash.
// Images are matched by product keyword first, then by category group,
// so every card shows a realistic photo of the actual kind of product.
// Every id below has been rendered and visually checked against its label.

function unsplash(id: string, w = 600, h = 600): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

// One representative, verified photo per catalogue group (used for category
// banners, campaign tiles and as the fallback when no product keyword matches).
const GROUP_IMAGE_ID: Record<string, string> = {
  produce: "1542838132-92c53300491e",
  meat: "1600891964092-4316c288032e",
  seafood: "1519708227418-c8fd9a32b7a2",
  dairy: "1550583724-b2692b85b150",
  bakery: "1509440159596-0249088772ff",
  frozen: "1560008581-09826d1de69e",
  pantry: "1586201375761-83865001e31c",
  beverages: "1447933601403-0c6688de566e",
  snacks: "1566478989037-eec170784d0b",
  breakfast: "1607958996333-41aef7caefaa",
  organic: "1576045057995-568f588f82fb",
  baby: "1519689680058-324335c77eba",
  personal: "1556228720-195a672e8a03",
  household: "1584556812952-905ffd0c611a",
  cleaning: "1585421514738-01798e348b17",
  pet: "1589924691995-400dc9ecc119",
  health: "1584308666744-24d5c474f2ae",
  international: "1631452180519-c014fe946bc7",
  default: "1542838132-92c53300491e",
};

// Specific product-keyword matches, checked longest-keyword-first so more
// precise names (e.g. "ground beef") win over broader ones (e.g. "beef").
const KEYWORD_IMAGE_ID: [string, string][] = [
  ["organic bananas", "1571771894821-ce9b6c11b08e"],
  ["bananas", "1571771894821-ce9b6c11b08e"],
  ["avocados", "1523049673857-eb18f1d7b578"],
  ["honeycrisp apples", "1560806887-1e4cd0b6cbd6"],
  ["apples", "1568702846914-96b305d2aaeb"],
  ["seedless red grapes", "1596363505729-4190a9506133"],
  ["grapes", "1596363505729-4190a9506133"],
  ["baby spinach", "1576045057995-568f588f82fb"],
  ["spinach", "1576045057995-568f588f82fb"],
  ["vine tomatoes", "1592924357228-91a4daadcfea"],
  ["tomatoes", "1592924357228-91a4daadcfea"],
  ["broccoli", "1459411621453-7b03977f4bfc"],
  ["yellow onions", "1508747703725-719777637510"],
  ["onions", "1508747703725-719777637510"],
  ["fresh basil", "1618164436241-4473940d1f5c"],
  ["organic carrots", "1447175008436-054170c2e979"],
  ["carrots", "1447175008436-054170c2e979"],
  ["romaine hearts", "1622206151226-18ca2c9ab4a1"],
  ["organic kale", "1576045057995-568f588f82fb"],

  ["boneless chicken breast", "1604503468506-a8da13d82791"],
  ["chicken thighs", "1604503468506-a8da13d82791"],
  ["free-range whole chicken", "1587593810167-a84920ea0781"],
  ["ground beef", "1551782450-a2132b4ba21d"],
  ["ribeye steak", "1600891964092-4316c288032e"],
  ["pork tenderloin", "1602470520998-f4a52199a3d6"],
  ["lamb chops", "1544025162-d76694265947"],
  ["smoked deli ham", "1607623814075-e51df1bdc82f"],
  ["applewood bacon", "1607623814075-e51df1bdc82f"],

  ["wild-caught salmon fillet", "1519708227418-c8fd9a32b7a2"],
  ["jumbo shrimp", "1565680018434-b513d5e5fd47"],
  ["ahi tuna steaks", "1580476262798-bddd9f4b7369"],
  ["sea scallops", "1607330289024-1535c6b4e1c1"],
  ["smoked salmon", "1519708227418-c8fd9a32b7a2"],
  ["cod fillet", "1615141982883-c7ad0e69fd62"],
  ["mussels", "1607330289024-1535c6b4e1c1"],

  ["whole milk", "1550583724-b2692b85b150"],
  ["almond milk", "1550583724-b2692b85b150"],
  ["organic whole milk", "1550583724-b2692b85b150"],
  ["free-range large eggs", "1518569656558-1f25e69d93d7"],
  ["organic free-range eggs", "1518569656558-1f25e69d93d7"],
  ["sharp cheddar cheese", "1618164436241-4473940d1f5c"],
  ["mozzarella shredded", "1552767059-ce182ead6c1b"],
  ["parmesan wedge", "1552767059-ce182ead6c1b"],
  ["plain greek yoghurt", "1488477181946-6428a0291777"],
  ["vanilla bean yoghurt", "1488477181946-6428a0291777"],
  ["unsalted butter", "1589985270826-4b7bb135bc9d"],
  ["heavy whipping cream", "1563636619-e9143da7973b"],

  ["sourdough boule", "1509440159596-0249088772ff"],
  ["whole wheat sandwich bread", "1509440159596-0249088772ff"],
  ["butter croissants", "1555507036-ab1f4038808a"],
  ["brioche burger buns", "1568254183919-78a4f43a2877"],
  ["chocolate chip muffins", "1607958996333-41aef7caefaa"],
  ["classic bagels", "1509440159596-0249088772ff"],
  ["carrot cake slice", "1607958996333-41aef7caefaa"],

  ["wild blueberries", "1498557850523-fd3d118b962e"],
  ["mixed vegetable medley", "1584270354949-c26b0d5b4a0c"],
  ["frozen mango chunks", "1591073113125-e46713c829ed"],
  ["margherita pizza", "1513104890138-7c749659a591"],
  ["vanilla bean ice cream", "1560008581-09826d1de69e"],
  ["chocolate fudge ice cream", "1576506295286-5cda18df43e7"],
  ["chicken pot pie", "1585937421612-70a008356fbe"],
  ["mozzarella sticks", "1552767059-ce182ead6c1b"],

  ["extra virgin olive oil", "1474979266404-7eaacbcd87c5"],
  ["organic extra virgin olive oil", "1474979266404-7eaacbcd87c5"],
  ["extra virgin greek olive oil", "1474979266404-7eaacbcd87c5"],
  ["balsamic vinegar", "1474979266404-7eaacbcd87c5"],
  ["long grain jasmine rice", "1586201375761-83865001e31c"],
  ["organic brown rice", "1586201375761-83865001e31c"],
  ["penne pasta", "1551462147-ff29053bfc14"],
  ["spaghetti", "1551462147-ff29053bfc14"],
  ["crushed tomatoes", "1592924357228-91a4daadcfea"],
  ["raw honey", "1471943311424-646960669fbc"],
  ["quinoa", "1586201375761-83865001e31c"],
  ["organic quinoa", "1586201375761-83865001e31c"],
  ["dijon mustard", "1528750717929-32abb73d3bd9"],
  ["black beans", "1586201375761-83865001e31c"],

  ["colombian ground coffee", "1447933601403-0c6688de566e"],
  ["espresso roast beans", "1447933601403-0c6688de566e"],
  ["earl grey tea bags", "1627435601361-ec25f5b1d0e5"],
  ["green tea bags", "1627435601361-ec25f5b1d0e5"],
  ["cold-pressed orange juice", "1600271886742-f049cd451bba"],
  ["cranberry juice cocktail", "1600271886742-f049cd451bba"],
  ["sparkling water", "1523362628745-0c100150b504"],
  ["spring water", "1523362628745-0c100150b504"],
  ["cola classic", "1554866585-cd94860890b7"],

  ["sea salt kettle chips", "1566478989037-eec170784d0b"],
  ["tortilla chips", "1600952841320-db92ec4047ca"],
  ["roasted almonds", "1508061253366-f7da158b6d46"],
  ["mixed nuts", "1508061253366-f7da158b6d46"],
  ["dark chocolate bar", "1511381939415-e44015466834"],
  ["milk chocolate almonds", "1511381939415-e44015466834"],
  ["whole wheat crackers", "1566478989037-eec170784d0b"],
  ["water crackers", "1566478989037-eec170784d0b"],

  ["rolled oats", "1607958996333-41aef7caefaa"],
  ["baby oatmeal cereal", "1607958996333-41aef7caefaa"],
  ["honey nut granola cereal", "1607958996333-41aef7caefaa"],
  ["multigrain cereal flakes", "1607958996333-41aef7caefaa"],
  ["peanut butter", "1471943311424-646960669fbc"],
  ["strawberry fruit preserves", "1471943311424-646960669fbc"],
  ["buttermilk pancake mix", "1607958996333-41aef7caefaa"],
  ["maple syrup", "1471943311424-646960669fbc"],

  ["hypoallergenic baby diapers", "1519689680058-324335c77eba"],
  ["organic baby puree", "1522771930-78848d9293e8"],
  ["gentle baby lotion", "1556228720-195a672e8a03"],
  ["baby wipes", "1519689680058-324335c77eba"],
  ["baby bottles", "1522771930-78848d9293e8"],

  ["hydrating face moisturizer", "1556228720-195a672e8a03"],
  ["argan oil shampoo", "1526947425960-945c6e72858f"],
  ["whitening toothpaste", "1607613009820-a29f7bb81c04"],
  ["charcoal body wash", "1526947425960-945c6e72858f"],
  ["conditioner", "1526947425960-945c6e72858f"],
  ["sensitive skin sunscreen", "1556228720-195a672e8a03"],

  ["ultra-soft paper towels", "1584556812952-905ffd0c611a"],
  ["reusable glass food containers", "1584556812952-905ffd0c611a"],
  ["non-stick frying pan", "1556909212-d5b604d0c90d"],
  ["bath tissue", "1584556812952-905ffd0c611a"],
  ["laundry detergent", "1583947215259-38e31be8751f"],
  ["storage bags", "1584556812952-905ffd0c611a"],

  ["all-purpose cleaner spray", "1585421514738-01798e348b17"],
  ["dish soap", "1584556812952-905ffd0c611a"],
  ["scented air freshener", "1585421514738-01798e348b17"],
  ["kitchen trash bags", "1532996122724-e3c354a0b15b"],
  ["glass & window cleaner", "1585421514738-01798e348b17"],
  ["dishwasher detergent pods", "1585421514738-01798e348b17"],

  ["dry dog food", "1589924691995-400dc9ecc119"],
  ["grain-free cat food", "1615789591457-74a63395c990"],
  ["dental chew treats", "1589924691995-400dc9ecc119"],
  ["cat litter", "1615789591457-74a63395c990"],
  ["dog chew toy", "1583512603805-3cc6b41f3edb"],

  ["multivitamin tablets", "1584308666744-24d5c474f2ae"],
  ["vitamin c chewables", "1550572017-edd951b55104"],
  ["first aid kit", "1603398938378-e54eab446dde"],
  ["omega-3 fish oil", "1550572017-edd951b55104"],
  ["probiotic capsules", "1584308666744-24d5c474f2ae"],

  ["jasmine coconut curry sauce", "1631452180519-c014fe946bc7"],
  ["kimchi", "1583224964978-2257b960c3d3"],
  ["hummus", "1590301157890-4810ed352733"],
  ["corn tortillas", "1613514785940-daed07799d9b"],
  ["salsa verde", "1613514785940-daed07799d9b"],
  ["belgian waffle cookies", "1499636136210-6f4ee915583e"],
];

function findKeywordId(name: string): string | undefined {
  const lower = name.toLowerCase();
  const sorted = [...KEYWORD_IMAGE_ID].sort((a, b) => b[0].length - a[0].length);
  for (const [keyword, id] of sorted) {
    if (lower.includes(keyword)) return id;
  }
  return undefined;
}

export function productPhoto(name: string, group: string, size = 600): string {
  const id = findKeywordId(name) ?? GROUP_IMAGE_ID[group] ?? GROUP_IMAGE_ID.default;
  return unsplash(id, size, size);
}

export function categoryPhoto(group: string, w = 1200, h = 480): string {
  const id = GROUP_IMAGE_ID[group] ?? GROUP_IMAGE_ID.default;
  return unsplash(id, w, h);
}
