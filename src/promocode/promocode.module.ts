import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Promocode } from './promocode.model';
import { PromocodeController } from './promocode.controller';
import { PromocodeService } from './promocode.service';

@Module({
  imports: [SequelizeModule.forFeature([Promocode])],
  controllers: [PromocodeController],
  providers: [PromocodeService]
})
export class PromocodeModule { }
