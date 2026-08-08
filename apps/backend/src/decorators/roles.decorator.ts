import { Reflector } from '@nestjs/core';
import Role from 'src/roles.enum';

export const Roles = Reflector.createDecorator<Role[]>();
