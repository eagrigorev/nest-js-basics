import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailController } from '../../controllers/mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport:
        'smtps://gb-test-nest@mail.ru:9qaV7w99xt6fWvN5ZcLH@smtp.mail.ru',
      defaults: {
        from: '"Проверка Nest.js" <gb-test-nest@mail.ru>',
      },
      template: {
        dir: join(__dirname, '../..', 'views/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
