export class PromocodeDto {
  title: string;
  discount: number;
  discountType: 'retail' |  // Розничная скидка
    'percentage'  // Процентная скидка;
}