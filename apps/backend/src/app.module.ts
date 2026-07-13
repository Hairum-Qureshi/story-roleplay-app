import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePlayAdModule } from './role-play-ad/role-play-ad.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { PdfModule } from './pdf/pdf.module';
import { EmailModule } from './email/email.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    EventsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    RolePlayAdModule,
    UserModule,
    ChatModule,
    PdfModule,
    EmailModule,
    NotificationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
