import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";
import { randomUUID } from "crypto";

export class CreateAccountDto {
    @IsString()
    account_id: string = randomUUID();

    @IsString()   
    account_name: string;

    @IsString()
    @IsEmail()
    account_email: string;

    @IsString()
    account_password: string;

    @IsString()
    account_role: string = "user";

    @IsString()
    account_status: string = "active";

    @IsDate()
    created_at: Date = new Date();

    @IsDate()
    updated_at: Date = new Date();
}
