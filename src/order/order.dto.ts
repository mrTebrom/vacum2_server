export class OrderDto {
  name: string;
  phone: string;
  basket: {
    title: string;
    price: number;
    que: number;
  }[];
  type: 'Каспи' | 'Наличные';
  comment: string;
}