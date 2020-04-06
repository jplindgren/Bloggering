import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(/*private readonly authService: AuthService*/){
        var secretKey = 'MiMu0ysYG/P4NM1EjqUTd3npG6etfNkvieTcm3cFvkfveL9oBy9ZQMifVmDHMDwgLtQkWjg1Qw2trzCHcYhcdxvbs9ijgundOfpTmlPwsXU51xF3cXvqxL+fppiNUywmkwYimbHXoN+PNnF7aiOvrVsHMR7vLpA7ZrJmG+pz0X0cLACHLfgmSsk8Y3xvNNTJ3oToClKYou27XW2LsYjcsQtYSSH2HrsiFCo/eEcezYldcfNGBWKAYemVIrLNnIwkNBQWIWT7F/wBUMaLWyH4lYUyUsJWRLDLcPbs9csDCrA8CBcGheUGD3NSkMsKde/uv9FUYEMgyZ6Uj80hy4D9NA==';
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretKey,
        });
    }

    async validate(payload, done: Function){
        try
        {
            // You could add a function to the authService to verify the claims of the token:
            // i.e. does the user still have the roles that are claimed by the token
            //const validClaims = await this.authService.verifyTokenClaims(payload);
            
            //if (!validClaims)
            //    return done(new UnauthorizedException('invalid token claims'), false);
    
            done(null, payload);
        }
        catch (err)
        {
            throw new UnauthorizedException('unauthorized', err.message);
        }
    }
}
