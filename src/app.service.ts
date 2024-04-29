import { Injectable, Logger } from '@nestjs/common';
import { storage } from './app.storage';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);

  greet(): string {
    this.logger.log('in AppService::greet() method');

    const store = storage.getStore();
    console.log('----- store = ', store);

    return 'Hello World!';
  }
}
