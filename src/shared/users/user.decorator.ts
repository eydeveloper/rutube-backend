import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../entity/user.entity';

export const UserDecorator = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  }
);
