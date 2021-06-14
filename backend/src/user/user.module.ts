import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDetails } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserDetails]),
    ],
    providers: [UserService, UserResolver],
    exports: [TypeOrmModule],
})

export class UserModule {}
