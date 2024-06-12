export interface CategoryCreateDto {
  value: string;
  description: string;
  attributes: number[];
}
export interface CategoryUpdateDto {
  value?: string;
  description?: string;
}
