import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { GraphqlModule } from "@graphql/graphql.module";
import { envSchema } from "@config/config.validation";
import { AuthModule } from "@root/auth/auth.module";
import { DatabaseModule } from "@root/database/database.module";
import { UserModule } from "@root/user/user.module";
import { WorkspaceModule } from "@root/workspace/workspace.module";
import databaseConfig from "@config/database";
import googleOauthConfig from "@config/googleOauth";
import jwtConfig from "@config/jwt";
import serverConfig from "@config/server";
import validationPipeConfig from "@config/validationPipe";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [
                databaseConfig, googleOauthConfig, jwtConfig, serverConfig, validationPipeConfig,
            ],
            validationSchema: envSchema,
        }),
        DatabaseModule,
        GraphqlModule,
        UserModule,
        WorkspaceModule,
        AuthModule,
    ],
    providers: [],
})

export class AppModule {}
