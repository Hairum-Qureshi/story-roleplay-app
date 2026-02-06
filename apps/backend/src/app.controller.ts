import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getServerStatus() {
    return {
      status: 200,
      message: 'TaleWeaver backend API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
