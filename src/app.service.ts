import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);

  greet(): string {
    this.logger.log('in AppService::greet() method');
    return 'Hello World!';
  }
}
