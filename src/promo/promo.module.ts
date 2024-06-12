import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Promo } from './promo.model';

@Module({
    imports: [SequelizeModule.forFeature([Promo])],
    controllers: [
        PromoController,],
    providers: [
        PromoService,],
    exports: [
        SequelizeModule
    ]

})
export class PromoModule { }
