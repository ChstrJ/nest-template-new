import { Injectable, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true, // auto-transform payloads
      whitelist: true, // remove unknown properties
      forbidNonWhitelisted: true, // throw error on extra props
      disableErrorMessages: process.env.APP_ENV === 'production' ? true : false,
      exceptionFactory: (errors: ValidationError[]) => {
        const formatted = errors.flatMap(err =>
          Object.entries(err.constraints || {}).map(([type, message]) => ({
            field: err.property,
            type,
            message,
          })),
        );

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: formatted,
        });
      },
    });
  }
}
