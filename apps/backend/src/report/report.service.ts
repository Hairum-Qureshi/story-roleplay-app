import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModerationStatus } from 'src/enums/moderation.enum';
import { User, UserDocument } from 'src/schemas/User';

@Injectable()
export class ReportService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

 
}
