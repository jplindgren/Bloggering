import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin()
    {
        // initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res)
    {
        // handles the Google OAuth2 callback
        const jwt: string = req.user.jwt;
        if (jwt)
            //res.redirect('http://localhost:4200/login/succes/' + jwt);
            res.status(200).json({ jwtToken: jwt });
        else 
            //res.redirect('http://localhost:4200/login/failure');
            res.status(400).json({ errorMessage: 'Authentication failed' });
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async loggerUserInfo(@Req() req)
    {
        const userId = req['user'].id;
        const user = await User.findOneOrFail(userId);
        return {
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.UpdatedAt,
            version: user.version,
        }
    }
}