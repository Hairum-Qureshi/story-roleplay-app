import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument } from '../types';
import { Message } from '../schemas/inbox/Message';

@Injectable()
export class IsMessageOwner implements CanActivate {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const messageID = request.params.messageID;

    const message = await this.messageModel.findById(messageID).exec();

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.sender !== user._id) {
      throw new ForbiddenException('You are not the owner of this message');
    }

    return true;
  }
}
