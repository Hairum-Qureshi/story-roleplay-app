import { Reflector } from '@nestjs/core';
import Role from 'src/enums/roles.enum';

export const Roles = Reflector.createDecorator<Role[]>();
