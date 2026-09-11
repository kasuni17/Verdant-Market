// Deterministic, dependency-free product/category art.
// Renders a soft gradient card with a category glyph as an inline SVG data URI,
// so every image loads instantly, never breaks, and stays visually consistent.

const PALETTES: Record<string, [string, string]> = {
  produce: ["#dff3e2", "#b0e0bd"],
  meat: ["#fbe3dd", "#f0bcae"],
  seafood: ["#dcedf5", "#aed4e8"],
  dairy: ["#fdf6e3", "#f4e3b0"],
  bakery: ["#f7e8d6", "#ecc99a"],
  frozen: ["#e2eefc", "#b9d4f4"],
  pantry: ["#f2ecdd", "#ddceac"],
  beverages: ["#e7eefb", "#c3d6f2"],
  snacks: ["#fdeee0", "#f6cf9f"],
  breakfast: ["#fdf0d9", "#f3d089"],
  organic: ["#e4f4e6", "#bfe4c6"],
  baby: ["#fdeef1", "#f6c9d3"],
  personal: ["#eee7f7", "#d3c1ec"],
  household: ["#e8f0ee", "#c2d9d2"],
  cleaning: ["#e3f2f7", "#b6dde8"],
  pet: ["#f3ecdf", "#e0c99f"],
  health: ["#e6f4f1", "#b6e0d5"],
  international: ["#fbeadd", "#f0c393"],
  default: ["#f4ecdd", "#d6d6bf"],
};

const GLYPHS: Record<string, string> = {
  produce: "🥬",
  meat: "🥩",
  seafood: "🐟",
  dairy: "🧀",
  bakery: "🥖",
  frozen: "🧊",
  pantry: "🫙",
  beverages: "🧃",
  snacks: "🍿",
  breakfast: "🥣",
  organic: "🌿",
  baby: "🍼",
  personal: "🧴",
  household: "🧺",
  cleaning: "🧽",
  pet: "🐾",
  health: "💊",
  international: "🌍",
  default: "🛒",
};

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function paletteFor(group: string): [string, string] {
  return PALETTES[group] ?? PALETTES.default;
}

export function glyphFor(group: string): string {
  return GLYPHS[group] ?? GLYPHS.default;
}

export function placeholderImage(seed: string, group: string, size = 600): string {
  const [c1, c2] = paletteFor(group);
  const glyph = glyphFor(group);
  const angle = hash(seed) % 360;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle} 0.5 0.5)">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#g)"/>
    <circle cx="${size * 0.78}" cy="${size * 0.22}" r="${size * 0.32}" fill="white" opacity="0.10"/>
    <circle cx="${size * 0.16}" cy="${size * 0.86}" r="${size * 0.22}" fill="white" opacity="0.10"/>
    <text x="50%" y="54%" font-size="${size * 0.34}" text-anchor="middle" dominant-baseline="middle">${glyph}</text>
  </svg>`.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function bannerImage(seed: string, group: string, w = 1200, h = 480): string {
  const [c1, c2] = paletteFor(group);
  const glyph = glyphFor(group);
  const angle = hash(seed) % 360;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle} 0.5 0.5)">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <circle cx="${w * 0.86}" cy="${h * 0.24}" r="${h * 0.6}" fill="white" opacity="0.12"/>
    <circle cx="${w * 0.1}" cy="${h * 0.9}" r="${h * 0.4}" fill="white" opacity="0.10"/>
    <text x="82%" y="58%" font-size="${h * 0.4}" text-anchor="middle" dominant-baseline="middle">${glyph}</text>
  </svg>`.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
