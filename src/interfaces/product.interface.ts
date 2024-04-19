export interface Product {
  id: number;
  name: string;
  sku: string;
  category: number;
  category_id: number;
  description: string;
  large_description: string;
  price: number;
  discount_price?: number;
  discount_percent?: number;
  is_new?: boolean;
  image_link?: string;
}
