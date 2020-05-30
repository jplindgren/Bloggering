import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

export enum Provider {
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    async validateOAuthLogin(email: string, name: string, thirdPartyId: string, provider: Provider): Promise<string> {
        try {
            let user: User = await User.findByThirdPartyId(thirdPartyId);
            if (!user) {
                user = new User();
                user.isActive = true;
                user.email = email;
                user.name = name;
                user.thirdPartyId = thirdPartyId;
                await User.save(user);
                console.log('user created', user);
            }

            return this.jwtService.sign({
                id: user.id,
                provider
            });
        }
        catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
