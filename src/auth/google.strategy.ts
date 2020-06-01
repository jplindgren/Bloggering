import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";
import { OAuth2ConfigService } from './../config/auth/configuration.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    constructor(private readonly authService: AuthService, private readonly oAuth2ConfigService: OAuth2ConfigService) {
        super({
            clientID: oAuth2ConfigService.clientId,
            clientSecret: oAuth2ConfigService.clientSecret,
            callbackURL: oAuth2ConfigService.callbackURL,
            passReqToCallback: true,
            scope: ['profile', 'email']
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
        try {
            const email = profile.emails
                .filter(x => x.verified)
                .map(x => x.value)[0];

            const jwt: string = await this.authService.validateOAuthLogin(email, profile.displayName, profile.id, Provider.GOOGLE);
            done(null, { jwt });
        }
        catch (err) {
            console.log(err)
            done(err, false);
        }
    }

}