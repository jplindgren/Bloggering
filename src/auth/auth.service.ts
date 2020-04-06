import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

export enum Provider
{
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {    
    //replace this with your secret jwt key. Generate one as below
    //node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
    private readonly JWT_SECRET_KEY = 'MiMu0ysYG/P4NM1EjqUTd3npG6etfNkvieTcm3cFvkfveL9oBy9ZQMifVmDHMDwgLtQkWjg1Qw2trzCHcYhcdxvbs9ijgundOfpTmlPwsXU51xF3cXvqxL+fppiNUywmkwYimbHXoN+PNnF7aiOvrVsHMR7vLpA7ZrJmG+pz0X0cLACHLfgmSsk8Y3xvNNTJ3oToClKYou27XW2LsYjcsQtYSSH2HrsiFCo/eEcezYldcfNGBWKAYemVIrLNnIwkNBQWIWT7F/wBUMaLWyH4lYUyUsJWRLDLcPbs9csDCrA8CBcGheUGD3NSkMsKde/uv9FUYEMgyZ6Uj80hy4D9NA=='; 

    constructor(/*private readonly usersService: UsersService*/) { };

    async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string>
    {
        try 
        {
            // You can add some registration logic here, 
            // to register the user using their thirdPartyId (in this case their googleId)
            // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);
            
            // if (!user)
                // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);
                
            const payload = {
                thirdPartyId,
                provider
            }

            const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
            return jwt;
        }
        catch (err)
        {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
