export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: any;
  soldOut?: boolean;
  quantity: number;
}
