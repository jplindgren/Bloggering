import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    
    constructor(private readonly authService: AuthService)
    {
        super({
            clientID    : '525390375965-mgh90rl2qghtg3fnbjg80uj0kpi1v52n.apps.googleusercontent.com',     // <- Replace this with your client id
            clientSecret: '0UfZ0Kh4u1ilUUUWXkuXCZ-5', // <- Replace this with your client secret
            callbackURL : 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile']
        })
    }


    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        try
        {
            console.log(profile);

            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
            const user = 
            {
                jwt
            }

            done(null, user);
        }
        catch(err)
        {
            console.log(err)
            done(err, false);
        }
    }

}