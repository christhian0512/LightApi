import { Controller, Post, UseGuards, Body, Request, Get, Put } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../local.auth.guard';
import { AuthenticatedGuard } from '../authenticated.guard';
import { createUserDto, updateUserDto } from '../user/user.dto';

@Controller('api')
export class AuthController {
    constructor(private usersService: AuthService) { }

        //api/register post method to create a user in the db.
        @Post('register')
            async register(@Body() user: createUserDto){
                return this.usersService.register(user);
            }

        //api/login post method to authenticate through the local guard.    
        @UseGuards(LocalAuthGuard)
        @Post('login')
            login(@Request() req){
                return this.usersService.login(req.user);
            }

        //api/logout get method to terminate the session.
        @Get('logout')
        logout(@Request() req): any {
            req.session.destroy();
                return { message: 'The user session has ended' }
        }

        //api/profile get method to retrieve user data, auth required.
        @UseGuards(AuthenticatedGuard)
        @Get('profile')
            getUser(@Request() req) {
                return this.usersService.findUser(req.user.id);
        }

        //api/profile put method to update user data, auth required.
        @UseGuards(AuthenticatedGuard)
        @Put('profile')
            updateUser(@Request() req, @Body() user:updateUserDto) {
                return this.usersService.update(req.user.id, user);
        }

}
