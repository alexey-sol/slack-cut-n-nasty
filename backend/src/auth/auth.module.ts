import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import jwtConfig from "@config/jwt";
import { UserModule } from "@root/user/user.module";
import { UserService } from "@root/user/user.service";
import { AuthController, GoogleAuthController } from "./auth.controller";
import { GoogleStrategy } from "./auth.strategy/google.strategy";
import { JwtStrategy } from "./auth.strategy/jwt.strategy";
import { AuthService } from "./auth.service";

const { expiresIn, secret } = jwtConfig();

@Module({
    imports: [
        ConfigModule,
        UserModule,
        JwtModule.register({
            secret, signOptions: { expiresIn },
        }),
    ],
    controllers: [AuthController, GoogleAuthController],
    providers: [AuthService, GoogleStrategy, JwtStrategy, UserService],
    exports: [AuthService, JwtModule],
})

export class AuthModule {}
