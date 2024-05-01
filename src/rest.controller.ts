import { Controller, Get, Logger } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class RestController {
  private readonly logger: Logger = new Logger(RestController.name);

  constructor(private readonly appService: AppService) {}

  @Get('/greet')
  greet(): string {
    this.logger.log('in AppController::greet() method');
    return this.appService.greet();
  }
}
