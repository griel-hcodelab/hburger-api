import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Login = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (field) {
      if (request.auth[field]) {
        return request.auth[field];
      } else {
        return null;
      }
    } else {
      return request.user;
    }
  },
);
