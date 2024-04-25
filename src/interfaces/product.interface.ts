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
  colors?: { color_hex: string }[];
  sizes?: { name: string }[];
  image_link?: string;
  other_images_link?: string;
}
