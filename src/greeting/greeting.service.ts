import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GreetingService {
  private readonly logger: Logger = new Logger(GreetingService.name);

  public greeting(name: string | undefined) {
    this.logger.log('in GreetingService::greeting() method');
    return {
      greeting: `Hello ${name ? name : `world`}`,
    };
  }
}
