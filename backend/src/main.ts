import "module-alias/register";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
import { AppModule } from "@app/app.module";
import { useContainer } from "class-validator";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);
    const validationOptions = configService.get<ValidationPipeOptions>("validationPipe");
    const apiPrefix = configService.get<string>("server.apiPrefix");
    const port = configService.get<number>("server.port");

    useContainer(app.select(AppModule), { fallbackOnErrors: true }); // [1]
    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.setGlobalPrefix(apiPrefix);
    app.use(cookieParser());

    await app.listen(port);
}

bootstrap().catch((error) => Logger.error(error));

// [1]. Allows to inject dependencies into @ValidatorConstraint as described here:
// https://github.com/nestjs/nest/issues/528#issuecomment-395338798
