import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserExists } from "@utils/providers/validation";
import { UserDetails } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserDetails]),
    ],
    providers: [UserService, UserResolver, UserExists],
    exports: [TypeOrmModule],
})

export class UserModule {}
