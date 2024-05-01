import { Controller, Get, Logger, Param } from '@nestjs/common';
import { GreetingService } from './greeting.service';

@Controller('api/greeting')
export class GreetingController {
  private readonly logger: Logger = new Logger(GreetingController.name);

  constructor(private readonly greetingService: GreetingService) {}

  @Get(':name')
  greeting(@Param('name') name?: string) {
    this.logger.log('in GreetingController::greeting() method');
    return this.greetingService.greeting(name);
  }
}
