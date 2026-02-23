import { Controller, Get } from "@nestjs/common";

@Controller()
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
