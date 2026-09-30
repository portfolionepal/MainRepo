const LucideIcons = require('lucide-react');

const getIconComponent = (iconName) => {
  if (!iconName) return LucideIcons.CheckCircle;
  
  const pascalName = iconName
    .split(/[-_ ]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  
  if (LucideIcons[pascalName]) {
    return LucideIcons[pascalName];
  }
  if (LucideIcons[iconName]) {
    return LucideIcons[iconName];
  }
  
  // partial match
  const allIcons = Object.keys(LucideIcons);
  const partialMatch = allIcons.find(key => key.toLowerCase().includes(pascalName.toLowerCase()) && !key.includes('Icon') && !key.startsWith('Lucide'));
  
  if (partialMatch && LucideIcons[partialMatch]) {
    return LucideIcons[partialMatch];
  }

  return LucideIcons.CheckCircle;
};

console.log(getIconComponent('tree').displayName || getIconComponent('tree').name || 'Found something');
console.log(getIconComponent('trending up').displayName || getIconComponent('trending up').name || 'Found something');
