import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { User } from 'src/users/user.entity';

export enum Provider
{
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
    constructor(/*private readonly usersService: UsersService*/) {
    };

    async validateOAuthLogin(profile: any, provider: Provider, jwtSecretKey: string): Promise<string>
    {        
        try 
        {
            console.log('profile', profile);
            const thirdPartyId = profile.id;
            // to register the user using their thirdPartyId (in this case their googleId)
            let user: User = await User.findByThirdPartyId(thirdPartyId);
            
            if (!user){
                user = new User();
                user.isActive = true;
                user.email = profile.email;
                user.name = profile.name;
                user.thirdPartyId = thirdPartyId;
                await User.insert(user);
            }
                
            const payload = {
                thirdPartyId,
                provider
            }            

            console.log('user', user);
            
            const jwt: string = sign(payload, jwtSecretKey, { expiresIn: 3600 });
            return jwt;
        }
        catch (err)
        {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
