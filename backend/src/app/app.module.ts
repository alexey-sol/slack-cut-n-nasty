import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "../database/database.module";
import databaseConfig from "../config/database";
import serverConfig from "../config/server";
import validationSchema from "../config/config.validation";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [serverConfig, databaseConfig],
            validationSchema,
        }),
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
