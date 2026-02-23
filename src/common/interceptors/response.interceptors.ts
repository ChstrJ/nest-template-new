import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type WrappedResponse<T> = {
  success: true;
  data: T;
  meta?: Record<string, any>;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, WrappedResponse<T>> {
  constructor() { }

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<WrappedResponse<T>> {
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data: any) => {
        // If controller already returns a wrapped object, don’t double-wrap.
        if (data && typeof data === 'object' && data.success === true && 'data' in data) {
          return data;
        }

        // Optional: allow controllers to return { data, meta }
        if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
          return {
            success: true,
            data: data.data,
            meta: {
              ...data.meta,
              path: req?.url,
              timestamp: Date.now(),
            },
          };
        }

        return {
          success: true,
          data,
          meta: {
            path: req?.url,
            timestamp: Date.now(),
          },
        };
      }),
    );
  }
}
