export interface Product {
  id: string;
  name: string;
  category: 'sneakers' | 'jackets' | 'accessories';
  colorway: string;
  colorwayCode: 'white-crimson' | 'black-crimson' | 'crimson-black';
  price: number;
  image: string;
  images?: string[];
  description: string;
  details: string[];
  sizes: string[];
  badge?: string;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface StoryArticle {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  tag: string;
}

export interface CraftFeature {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cropPosition: string;
}
