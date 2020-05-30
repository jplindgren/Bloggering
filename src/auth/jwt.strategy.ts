import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { OAuth2ConfigService } from './../config/auth/configuration.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly oAuth2ConfigService: OAuth2ConfigService /*private readonly authService: AuthService*/) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: oAuth2ConfigService.jwtSecret,
        });
    }

    async validate(payload, done: Function) {
        try {
            const user = await User.findOneOrFail(payload.id);
            // Add a function to the authService to verify the claims of the token:
            // i.e. does the user still have the roles that are claimed by the token
            //const validClaims = await this.authService.verifyTokenClaims(payload);

            //if (!validClaims)
            //    return done(new UnauthorizedException('invalid token claims'), false);

            done(null, user);
        }
        catch (err) {
            throw new UnauthorizedException('unauthorized', err.message);
        }
    }
}
