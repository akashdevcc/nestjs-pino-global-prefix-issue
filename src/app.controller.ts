import { Controller, Get, Logger } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get('/greet')
  greet(): string {
    this.logger.log('in AppController::greet() method');
    return this.appService.greet();
  }
}
