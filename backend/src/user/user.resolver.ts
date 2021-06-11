import { Args, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query()
    async getUser(@Args("id") id: number) {
        return this.userService.findOne(id);
    }
}
