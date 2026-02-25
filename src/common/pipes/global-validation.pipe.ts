import { Injectable, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from '../utils/errors.util';
import { ErrorCode } from '../constants/error-code';

@Injectable()
export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        const formatted = errors.flatMap(err =>
          Object.entries(err.constraints || {}).map(([type, message]) => ({
            field: err.property,
            message,
          })),
        );

        throw new ValidationException(ErrorCode.VALIDATION_ERROR, formatted);
      },
    });
  }
}
