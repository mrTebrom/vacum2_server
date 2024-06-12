
import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { OrderDto } from './order.dto';
const bot = "6378703086:AAHz1niMaQr4YEWEodznfO3tlOeAVQDcvXE"
const telegraf = new TelegramBot(bot, {
  polling: true
});
telegraf.addListener('message', function (message) {
  console.log(message)
})
@Injectable()
export class OrderService {
  private readonly bot = new TelegramBot(bot);

  async sendTelegramMessage(message: OrderDto): Promise<void> {
    try {
      // Отправляем сообщение на ваш телеграм-бот
      await this.bot.sendMessage(-4157748266, this.generateMessage(message));
    } catch (error) {
      console.error('Ошибка отправки сообщения в Telegram:', error);
    }
  }
  generateMessage(message: OrderDto) {
    let basket = ''
    message.basket.forEach((item) => {
      basket += `\n Название: ${item.title}\nЦена: ${item.price}\nКоличество: ${item.que}`
    })
    return `Имя: ${message.name}\nТелефон: ${message.phone}\nСпособ оплаты:${message.type}\nКомментарий:${message.comment}\n\n${basket}`
  }
}
