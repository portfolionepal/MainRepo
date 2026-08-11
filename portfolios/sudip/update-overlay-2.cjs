const fs = require('fs');
const path = require('path');
const dir = 'src/pages';
fs.readdirSync(dir).filter(f => f.endsWith('.jsx')).forEach(f => {
  let p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf8');
  let original = c;
  
  c = c.replace(/opacity-20 mix-blend-overlay/g, 'opacity-50');
  c = c.replace(/opacity-10 mix-blend-overlay/g, 'opacity-50');
  
  if (c !== original) {
    fs.writeFileSync(p, c);
    console.log('Updated ' + f);
  }
});
