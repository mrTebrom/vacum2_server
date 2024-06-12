import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICreatePromo } from './promo.interface';
import { Promo } from './promo.model';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class PromoService {
  constructor(
    @InjectModel(Promo) private promoModel: typeof Promo
  ) { }

  async create(createPromoDto: ICreatePromo): Promise<Promo> {
    const candidate = await this.promoModel.count();
    if (candidate <= 0) return await this.promoModel.create(createPromoDto);
    const promo = await this.promoModel.findByPk(1);
    await promo.update(createPromoDto);
    await promo.save();

  }

  async findAll(): Promise<Promo> {
    const promo = await this.promoModel.findAll();
    return promo[promo.length - 1]
  }

  async findOne(id: number): Promise<Promo> {
    return await this.promoModel.findByPk(id);
  }

  async update(id: number, updatePromoDto: ICreatePromo) {
    return await this.promoModel.update(updatePromoDto, {
      where: { id },
    });
  }

  async remove(id: number): Promise<number> {
    const deletedPromoCount = await this.promoModel.destroy({
      where: { id },
    });
    return deletedPromoCount;
  }

}
