import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, timestamp } from 'rxjs/operators';

type WrappedResponse<T> = {
  success: true;
  data: T;
  meta?: Record<string, any>;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, WrappedResponse<T>> {
  constructor() { }

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<WrappedResponse<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data: any) => {
        // If controller already returns a wrapped object, don’t double-wrap.
        if (data && typeof data === 'object' && data.success === true && 'data' in data) {
          return data;
        }
        // If controller returns { data, meta? }, normalize to wrapped shape.
        if (data && typeof data === 'object' && 'data' in data) {
          return {
            success: true,
            path: request.url,
            timestamp: new Date().getTime(),
            data: data.data,
            ...(data.meta ? { meta: data.meta } : {}),
          };
        }

        return {
          success: true,
          path: request.url,
          timestamp: new Date().getTime(),
          data,
        };
      }),
    );
  }
}
