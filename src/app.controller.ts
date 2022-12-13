import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';
@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notifications.findMany();
  }

  @Post('create')
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;
    await this.prisma.notifications.create({
      data: {
        id: randomUUID(),
        content: content,
        category: category,
        recipientId: recipientId,
      },
    });
    return 'Notificação criada com sucesso';
  }
}
