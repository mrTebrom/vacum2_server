import { Module } from '@nestjs/common';
import { SliderController } from './slider.controller';
import { SliderService } from './slider.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Slider } from './slider.model';

@Module({
  imports: [SequelizeModule.forFeature([Slider])],
  controllers: [SliderController],
  providers: [SliderService]
})
export class SliderModule { }
