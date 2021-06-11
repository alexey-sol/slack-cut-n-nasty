import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "../config/database";
import nodeEnvConst from "../utils/const/nodeEnv";

const isProduction = process.env.NODE_ENV === nodeEnvConst.PRODUCTION;

@Module({
    imports: [
        ConfigModule.forFeature(databaseConfig),
        TypeOrmModule.forRoot({
            ...databaseConfig(),
            cli: {
                migrationsDir: "migration",
            },
            entities: ["dist/**/*.entity{ .ts,.js}"],
            migrations: ["migration/*.js"],
            synchronize: !isProduction,
            type: "postgres",
        }),
    ],
})

export class DatabaseModule {}
