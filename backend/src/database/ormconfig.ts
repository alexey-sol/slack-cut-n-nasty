import databaseConfig from "@config/database";
import { Env } from "@root/utils/wrappers/Env";

const env = new Env();

export const ormConfig = {
    ...databaseConfig(),
    cli: {
        migrationsDir: "migration",
    },
    entities: ["dist/**/*.entity{ .ts,.js}"],
    migrations: [`${__dirname}/migration/**/*.ts`],
    synchronize: !env.isProduction(),
    type: "postgres",
};

export default ormConfig;
