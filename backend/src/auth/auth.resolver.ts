import { Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { UserWithDetails } from "@root/user/user.entity";
import { CurrentUser } from "./auth.decorators";
import { GqlJwtAuthGuard } from "./auth.guards";

@Resolver("Auth")
export class AuthResolver {
    @UseGuards(GqlJwtAuthGuard)
    @Query()
    auth(@CurrentUser() user: UserWithDetails): UserWithDetails {
        return user;
    }
}
