import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthProvider } from "@root/auth/authProvider.entity";
import { IsValidProvider, UserExists } from "@root/utils/providers/validation";
import { UserDetails } from "../userDetails/userDetails.entity";
import { UserRepository } from "./user.repository";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserDetails, AuthProvider]),
    ],
    providers: [UserService, UserResolver, IsValidProvider, UserExists],
    exports: [TypeOrmModule],
})

export class UserModule {}
