import { Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { ErrorResponse } from "./httpExceptions.types";
import { getAppropriateException } from "./httpExceptions.utils";

@Catch(HttpException)
export class HttpGqlExceptionFilter implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = exception.getResponse();
        const message = (response as ErrorResponse).message[0];
        return getAppropriateException(message);
    }
}
