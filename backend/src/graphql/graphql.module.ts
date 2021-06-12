import { GraphQLModule } from "@nestjs/graphql";
import { Module } from "@nestjs/common";
import { join } from "path";
import nodeEnvConst from "@utils/const/nodeEnv";

const isProduction = process.env.NODE_ENV === nodeEnvConst.PRODUCTION;

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: !isProduction,
            definitions: {
                outputAs: "class",
                path: join(process.cwd(), "src/graphql.ts"),
            },
            path: "graphql",
            playground: !isProduction,
            typePaths: ["./src/**/*.graphql"],
        }),
    ],
})

export class GraphqlModule {}
