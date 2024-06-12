
import { Body, Controller, UseGuards, Get, Post, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PromoService } from './promo.service';
import { ICreatePromo } from './promo.interface';
import { JwtAuthGuard } from '../auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid'
@Controller('promo')
export class PromoController {
  constructor(
    private service: PromoService
  ) { }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: ICreatePromo) {
    console.log('create')
    return this.service.create(dto);
  }
  @Get()
  findAll() {
    return this.service.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() dto: ICreatePromo) {
    return this.service.update(0, dto)
  }
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: '../ssr-client/public/uploads/promo-pictures',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.');
          const fileExtName = name[name.length - 1];

          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 10).toString(10))
            .join('');
          cb(null, v4() + randomName + '.' + fileExtName);
        },
      }),
    }),
  )
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    const response = [];
    files.forEach((file) => {
      const fileResponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileResponse.filename);
    });

    this.service.create(response[0])
    return response
  }
}
