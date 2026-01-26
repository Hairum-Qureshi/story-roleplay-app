import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { RolePlayAdModule } from 'src/role-play-ad/role-play-ad.module';

@Module({
  providers: [EventsGateway, EventsService],
  imports: [RolePlayAdModule],
})
export class EventsModule {}
