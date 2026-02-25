import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { GeneralException } from '../utils/errors.util';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong.';
    let code = 'internal_server_error';
    let extra: any = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        message = (res as any).message ?? message;
        code = (res as any).code ?? code;
        extra = { ...res };

        delete extra.message;
        delete extra.code;
        delete extra.success;
      }
    }

    type errorType = {
      code: string,
      message: string,
      errors?: any
    }

    type defaultFormatResponseType = {
      success: boolean,
      path: string,
      timestamp: number,
      error: errorType
    }

    let defaultFormatResponse: defaultFormatResponseType = {
      success: false,
      path: request.url,
      timestamp: new Date().getTime(),
      error: {
        code: code,
        message: message,
        ...(extra.errors ? { errors: extra.errors } : {})
      },
    }

    response.status(status).json(defaultFormatResponse);
  }
}
