import { Controller, Post, UseGuards, Body, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { Users } from '../user/user.entity';
import { LocalAuthGuard } from '../local.auth.guard';
import { AuthenticatedGuard } from '../authenticated.guard';

@Controller('api')
export class AuthController {
    constructor(private usersService: AuthService) { }

        @Post('register')
            async register(@Body() user: Users): Promise<Users> {
                return this.usersService.register(user);
            }

        @UseGuards(LocalAuthGuard)
        @Post('login')
            async login(@Request() req){
                return this.usersService.login(req.user);
            }

        @UseGuards(AuthenticatedGuard)
        @Get('profile')
            getUser(@Body() user): string {
              return user.username;
        }

}
