import { Injectable } from '@nestjs/common';
import { RolePlayAdService } from 'src/role-play-ad/role-play-ad.service';

@Injectable()
export class EventsService {
  constructor(private readonly rolePlayAdService: RolePlayAdService) {}

  // create(createMessageDto: CreateMessageDto) {
  //   return 'This action adds a new message';
  // }

  async findAll() {
    return await this.rolePlayAdService.getAllAds();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
