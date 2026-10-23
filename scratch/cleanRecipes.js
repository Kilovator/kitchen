import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, '../src/data/recipes.ts');

let c = fs.readFileSync(file, 'utf8');
const idx = c.indexOf('carbonara: {');
const endIdx = c.indexOf('export const SUPERMARKETS');

const fixed = `carbonara: {
    id: "carbonara",
    title: { ru: "Спагетти Карбонара", en: "Spaghetti Carbonara", pl: "Spaghetti Carbonara" },
    calories: 520,
    protein: 24,
    fat: 22,
    carbs: 58,
    healthScore: { ru: "85% (Итальянская классика)", en: "85% (Italian Classic)", pl: "85% (Włoski Klasyk)" },
    summary: {
      ru: "Сытная паста с энергией медленных углеводов.",
      en: "Satisfying pasta providing protein and energy.",
      pl: "Sycący makaron zapewniający energię."
    },
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80"
  }
};

`;

c = c.slice(0, idx) + fixed + c.slice(endIdx);
fs.writeFileSync(file, c, 'utf8');
console.log('Cleaned recipes.ts successfully');
