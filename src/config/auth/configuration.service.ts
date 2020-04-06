import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class OAuth2ConfigService {
  constructor(private configService: ConfigService) {}
  
  get clientId(): string {
    return this.configService.get<string>('oauth2.clientId');
  }
  get clientSecret(): string {
    return this.configService.get<string>('oauth2.clientSecret');
  }
  get jwtSecret(): string {
    return this.configService.get<string>('oauth2.jwtSecret');
  }
  get callbackURL(): string {
   return this.configService.get<string>('oauth2.callbackURL');
  }
}