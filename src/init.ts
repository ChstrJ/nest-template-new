import { INestApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';

export function initApp(app: INestApplication) {
  // Security headers
  app.use(helmet);

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });

  // Rate limiting

  // Cookie parser if you use cookies
  app.use(cookieParser());

  app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  return app;
}
