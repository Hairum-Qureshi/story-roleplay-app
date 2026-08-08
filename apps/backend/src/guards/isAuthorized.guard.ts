import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/User';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';
import Role from 'src/roles.enum';

@Injectable()
export class HasRolePermissions implements CanActivate {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const currUserID: string = context.switchToHttp().getRequest().user._id;
    const roles: Role[] = this.reflector.get<Role[]>(
      Roles,
      context.getHandler(),
    ); 

    const user: UserDocument | null = await this.userModel
      .findById(currUserID)
      .lean();

    if (!user) throw new NotFoundException('User not found');

    if (roles.includes(user.role as Role)) {
      return true;
    }

    throw new ForbiddenException(
      'You do not have permission to perform this action',
    );
  }
}
