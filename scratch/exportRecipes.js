import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '../src/data/recipes');
const files = fs.readdirSync(dir);

const all = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const recipeBlocks = content.split(/\{\s*id:\s*"/g).slice(1);
  recipeBlocks.forEach(block => {
    const idMatch = block.match(/^([^"]+)"/);
    const titleRuMatch = block.match(/title:\s*\{\s*ru:\s*"([^"]+)"/);
    const titleEnMatch = block.match(/en:\s*"([^"]+)"/);
    const imageMatch = block.match(/image:\s*"([^"]+)"/);
    
    all.push({
      file: f,
      id: idMatch ? idMatch[1] : '',
      titleRu: titleRuMatch ? titleRuMatch[1] : '',
      titleEn: titleEnMatch ? titleEnMatch[1] : '',
      image: imageMatch ? imageMatch[1] : ''
    });
  });
});

fs.writeFileSync(path.join(__dirname, 'all_recipes.json'), JSON.stringify(all, null, 2), 'utf8');
console.log(`Saved ${all.length} recipes to scratch/all_recipes.json`);
