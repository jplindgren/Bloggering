import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { User } from 'src/users/user.entity';

export enum Provider {
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
    async validateOAuthLogin(profile: any, provider: Provider, jwtSecretKey: string): Promise<string> {
        try {
            // to register the user using their thirdPartyId (in this case their googleId)
            const thirdPartyId = profile.id;

            let user: User = await User.findByThirdPartyId(thirdPartyId);
            if (!user) {
                user = new User();
                user.isActive = true;
                user.email = profile.emails
                    .filter(x => x.verified)
                    .map(x => x.value)[0];
                user.name = profile.displayName;
                user.thirdPartyId = thirdPartyId;
                await User.insert(user);
                console.log('user created', user);
            }

            const payload = {
                id: user.id,
                entity: user,
                provider
            }
            const jwt: string = sign(payload, jwtSecretKey, { expiresIn: 3600 });
            return jwt;
        }
        catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
