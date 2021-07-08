import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { strategyNames as names } from "./auth.const";

@Injectable()
export class GoogleAuthGuard extends AuthGuard(names.GOOGLE) {}

@Injectable()
export class GqlAuthGuard extends AuthGuard(names.JWT) {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
