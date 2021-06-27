import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Env } from "@utils/wrappers/Env";
import databaseConfig from "@config/database";

const env = new Env();

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
            synchronize: !env.isProduction(),
            type: "postgres",
        }),
    ],
})

export class DatabaseModule {}
