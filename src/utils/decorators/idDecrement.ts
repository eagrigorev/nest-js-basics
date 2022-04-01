import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IdDecrement = createParamDecorator(
  (data: string[], ctx: ExecutionContext): void => {
    const request = ctx.switchToHttp().getRequest();
    data.forEach((element) => {
      const queryId = request.query[element];
      if (queryId) {
        request.query[element] = queryId - 1;
      }
      const bodyId = request.body[element];
      if (bodyId) {
        request.body[element] = bodyId - 1;
      }
    });
  },
);
