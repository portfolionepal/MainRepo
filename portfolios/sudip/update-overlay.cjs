const fs = require('fs');
const path = require('path');
const dir = 'src/pages';
fs.readdirSync(dir).filter(f => f.endsWith('.jsx')).forEach(f => {
  let p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf8');
  let original = c;
  
  // Replace the mix-blend-overlay and low opacity with a simple high opacity image
  c = c.replace(/className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"/g, 'className="absolute inset-0 bg-cover bg-center opacity-50"');
  
  // also handle cases where there might be spaces or other differences
  c = c.replace(/opacity-30 mix-blend-overlay/g, 'opacity-50');
  
  if (c !== original) {
    fs.writeFileSync(p, c);
    console.log('Updated ' + f);
  }
});
