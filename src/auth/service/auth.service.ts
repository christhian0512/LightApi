import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/';
import { Repository } from 'typeorm';
import { Users } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { createUserDto,updateUserDto} from '../user/user.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {}

    //checks for duplicates and created a user with a hashed password.
    async register(user: createUserDto){

        const foundUser = await this.userRepository.findOne({ 
            where: {
                username: user.username
            } });
        if (foundUser) {
            throw new BadRequestException('bad request', { cause: new Error(), description: 'username unavailable please try again with a different value' })
        }

        const hashedPass = await this.hashPassword(user.password)
        user.password = hashedPass
        const userCreated=await this.userRepository.save(user)
        const { password, ...result } = userCreated
        return result;
    }

    //aux method to encrypt the password string.
    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        hashedPass
        return hashedPass;
    }

    //authentication
    async validateUser(username: any, password: any) {
        if(typeof username === 'string' && typeof password === 'string'){

        
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

        }else{
            throw new BadRequestException('bad request', { cause: new Error(), description: 'username and password must be string values' })
        }
 
    }

    //retrieves user data
    async findUser(id: number) {
        const foundUser = await this.userRepository.findOne({ 
            where: {
                id: id
            } });
        if (foundUser) {
            const { password, ...result } = foundUser
            return result;
        }
        return {
            message: "no information available"
        }
 
    }

    //simple response to the login attempt
    async login(user: any) {
        const result = { username: user.username };
 
        return {
            User: result.username,
            message: 'logged in'
        };
    }

    //update user data
    async update(id: number, user: updateUserDto) {

        if(user.password) user.password= await this.hashPassword(user.password)
        const userUpdated=await this.userRepository.update(id, user)
         
        return {
            message: 'profile updated successfuly'
        };
    }


}
