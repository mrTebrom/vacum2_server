import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService, } from './product.service';
import { ProductCreateDto, ProductUpdateDto } from './product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { v4 } from 'uuid'
@Controller('product')
export class ProductController {
  constructor(private service: ProductService) { }

  @Get('/')
  findAll() {
    return this.service.findAll();
  }
  @Get('/news')
  findNesTabs() {
    return this.service.findNesTabs();
  }
  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.service.findOne(id);
  }
  @Post('/')
  create(@Body() dto: ProductCreateDto) {

    return this.service.create(dto);
  }
  @Put(':id')
  update(@Body() dto: ProductUpdateDto, @Param('id') id: number) {
    return this.service.update(id, dto);
  }
  @Post('/upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: '../ssr-client/public/uploads',
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
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const response = [];
    files.forEach((file) => {
      const fileResponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileResponse.filename);
    });
    return response;
  }

  @Delete('/:id')
  destroy(@Param('id') id: number) {
    return this.service.destroy(id);
  }



}
