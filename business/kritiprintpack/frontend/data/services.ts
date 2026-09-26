export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  icon: string;
  process: ProcessStep[];
  benefits: string[];
  isFeatured?: boolean;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}


