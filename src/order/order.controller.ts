import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService
  ) { }

  @Post('')
  sendOrder(@Body() dto: OrderDto) {
    this.orderService.sendTelegramMessage(dto)
  }
}
