import { IsString, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class createUserDto{

    
   @IsString()
   @IsNotEmpty()
   username: string;

   @IsString()
   @IsNotEmpty()
   password: string

   @IsEmail()
   @IsOptional()
   email: string

   @IsString()
   @IsOptional()
   note: string

}


export class updateUserDto{

    @IsString()
    @IsOptional()
    password: string
 
    @IsEmail()
    @IsOptional()
    email: string
 
    @IsString()
    @IsOptional()
    note: string
 
 }