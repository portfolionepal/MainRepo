import * as LucideIcons from "lucide-react";

export const getIconComponent = (iconName: string) => {
  if (!iconName) return LucideIcons.CheckCircle;
  
  // Convert to PascalCase to match Lucide component names
  // e.g., "tree" -> "Tree", "trending-up" -> "TrendingUp"
  const pascalName = iconName
    .split(/[-_ ]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  
  // Exact match
  if ((LucideIcons as any)[pascalName]) {
    return (LucideIcons as any)[pascalName];
  }
  
  // Pluralization match (e.g. tree -> Trees)
  if ((LucideIcons as any)[pascalName + 's']) {
    return (LucideIcons as any)[pascalName + 's'];
  }
  
  // Fuzzy/partial match
  const allIcons = Object.keys(LucideIcons);
  const partialMatch = allIcons.find(key => 
    key.toLowerCase().includes(pascalName.toLowerCase()) && 
    !key.includes('Icon') && 
    !key.startsWith('Lucide')
  );
  
  if (partialMatch && (LucideIcons as any)[partialMatch]) {
    return (LucideIcons as any)[partialMatch];
  }

  return LucideIcons.CheckCircle;
};
