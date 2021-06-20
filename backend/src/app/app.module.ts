import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "@database/database.module";
import { GraphqlModule } from "@graphql/graphql.module";
import { UserModule } from "@user/user.module";
import { WorkspaceModule } from "@workspace/workspace.module";
import { envSchema } from "@config/config.validation";
import databaseConfig from "@config/database";
import serverConfig from "@config/server";
import validationPipeConfig from "@config/validationPipe";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [serverConfig, databaseConfig, validationPipeConfig],
            validationSchema: envSchema,
        }),
        DatabaseModule,
        GraphqlModule,
        UserModule,
        WorkspaceModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
