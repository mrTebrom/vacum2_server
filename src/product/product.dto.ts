export interface ProductCreateDto {
  images: string[]
  title: string;
  price: number;
  categoryId: number;
  description: string;
  attributes: { id: number; value: string }[];
}
export interface ProductUpdateDto {
  images: string[];
  title: string;
  price: number;
  categoryId: number;
  description: string;
  attributes: { id: number; value: string }[];
}
