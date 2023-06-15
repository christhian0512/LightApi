import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/';
import { Repository } from 'typeorm';
import { Users } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {}

    async register(user: Users): Promise<any> {
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(user.password, salt);
        user.password = hashedPass
        const userCreated=await this.userRepository.save(user)
        const { password, ...result } = userCreated
        return result;
    }


    async validateUser(username: string, password: string): Promise<any> {
        const foundUser = await this.userRepository.findOne({ 
            where: {
                username: username
            } });
        if (foundUser) {
            if (await bcrypt.compare(password, foundUser.password)) {
                const { password, ...result } = foundUser
                return result;
            }
 
            return null;
        }
        return null
 
    }


    async login(user: any) {
        const result = { username: user.username };
 
        return {
            User: result.username,
            msg: 'logged in'
        };
    }


}
