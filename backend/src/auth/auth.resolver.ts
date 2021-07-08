import { Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { UserWithDetails } from "@root/user/user.entity";
import { CurrentUser } from "./auth.decorators";
import { GqlAuthGuard } from "./auth.guards";

@Resolver("Auth")
export class AuthResolver {
    @UseGuards(GqlAuthGuard)
    @Query()
    auth(@CurrentUser() user: UserWithDetails): UserWithDetails {
        return user;
    }
}
