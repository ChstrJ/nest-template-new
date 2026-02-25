import { Body, Controller, Get } from "@nestjs/common";
import { ErrorCode } from "src/common/constants/error-code";
import { NotFoundException } from "src/common/utils/errors.util";

@Controller('health')
export class HealthController {

  @Get()
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version,
    };
  }
}
