import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { SliderService } from './slider.service';
import { v4 } from 'uuid'

@Controller('slider')
export class SliderController {
  constructor(private service: SliderService) { }
  @Post('/')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: '../ssr-client/public/uploads/slider',
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

    return this.service.create(response[0])
  }
  @Get()
  async findAll() {
    return this.service.findAll()
  }
  @Delete(':id')
  async destroy(@Param('id') id: number) {
    return this.service.destroy(id)
  }
}
