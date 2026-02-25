import { HttpException, HttpStatus } from '@nestjs/common';
import { errors } from '../constants/error-code';

export class GeneralException extends HttpException {
  public readonly code: string;

  constructor(code: string, statusCode: number, extra?: any) {
    const errorMessage = errors(code).message;
    super(
      {
        success: false,
        code,
        message: extra.message ?? errorMessage,
        ...extra,
      },
      statusCode,
    );

    this.code = code;
  }
}

export class BadRequestException extends GeneralException {
  constructor(code: string, extra?: any) {
    super(code, HttpStatus.BAD_REQUEST, extra);
  }
}

export class NotFoundException extends GeneralException {
  constructor(code: string, extra?: any) {
    super(code, HttpStatus.NOT_FOUND, extra);
  }
}

export class UnauthorizedException extends GeneralException {
  constructor(code: string, extra?: any) {
    super(code, HttpStatus.UNAUTHORIZED, extra);
  }
}

export class ValidationException extends GeneralException {
  constructor(code: string, errors?: any) {
    super(code, HttpStatus.BAD_REQUEST, { errors });
  }
}
