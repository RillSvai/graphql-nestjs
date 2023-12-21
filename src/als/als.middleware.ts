import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  constructor(private readonly als: AsyncLocalStorage<any>) {}
  use(req: any, res: any, next: (error?: any) => void) {
    this.als.run({ test: 'test' }, () => {
      next();
    });
  }
}
