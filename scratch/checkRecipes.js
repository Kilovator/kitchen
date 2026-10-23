import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '../src/data/recipes');
const files = fs.readdirSync(dir);

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  console.log(`\n=================== ${f} ===================`);
  
  const recipeBlocks = content.split(/\{\s*id:\s*"/g).slice(1);
  recipeBlocks.forEach(block => {
    const idMatch = block.match(/^([^"]+)"/);
    const titleRuMatch = block.match(/title:\s*\{\s*ru:\s*"([^"]+)"/);
    const titleEnMatch = block.match(/en:\s*"([^"]+)"/);
    const imageMatch = block.match(/image:\s*"([^"]+)"/);
    
    const id = idMatch ? idMatch[1] : 'unknown';
    const titleRu = titleRuMatch ? titleRuMatch[1] : '';
    const titleEn = titleEnMatch ? titleEnMatch[1] : '';
    const image = imageMatch ? imageMatch[1] : '';
    
    console.log(`${id} | ${titleRu} (${titleEn}) | ${image}`);
  });
});
