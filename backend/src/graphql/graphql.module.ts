import { GraphQLModule } from "@nestjs/graphql";
import { Module } from "@nestjs/common";
import { DateScalar } from "@graphql/graphql.scalar";
import { Env } from "@utils/wrappers/Env";
import { join } from "path";
import serverConfig from "@config/server";

const env = new Env();

@Module({
    imports: [
        GraphQLModule.forRoot({
            cors: {
                origin: serverConfig().frontendUrl,
                credentials: true,
            },
            debug: !env.isProduction(),
            definitions: {
                outputAs: "class",
                path: join(process.cwd(), "src", "graphql.ts"),
            },
            path: "graphql",
            playground: !env.isProduction(),
            typePaths: ["./src/**/*.graphql"],
        }),
    ],
    providers: [DateScalar],
})

export class GraphqlModule {}
