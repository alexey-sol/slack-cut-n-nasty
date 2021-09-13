import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "@config/database";
import { Env } from "@root/utils/wrappers/Env";
import { ormConfig } from "./ormconfig";

const env = new Env();

@Module({
    imports: [
        ConfigModule.forFeature(databaseConfig),
        TypeOrmModule.forRoot({
            ...ormConfig as TypeOrmModuleOptions,
            autoLoadEntities: env.isProduction(),
        }),
    ],
})

export class DatabaseModule {}
