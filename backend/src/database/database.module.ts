import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "../config/database";
import nodeEnvConst from "../utils/const/nodeEnv";

const { PRODUCTION } = nodeEnvConst;
const { NODE_ENV } = process.env;

@Module({
    imports: [
        ConfigModule.forFeature(databaseConfig),
        TypeOrmModule.forRoot({
            ...databaseConfig(),
            entities: [],
            synchronize: NODE_ENV !== PRODUCTION,
            type: "postgres",
        }),
    ],
    // providers: [],
})

export class DatabaseModule {}
