import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export namespace transform {
  export const RPCPayload = createParamDecorator(
    async (schema: unknown, ctx: ExecutionContext) => {
      const data = ctx.switchToRpc().getData();

      return Object.keys(schema).reduce(
        (acc, cv) => ({ ...acc, [schema[cv]]: data[cv] }),
        {},
      );
    },
  );
}
