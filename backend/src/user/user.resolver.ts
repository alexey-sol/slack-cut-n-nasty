import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { CreateUserDto } from "./user.entity";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query()
    async getUser(@Args("id") id: number) {
        return this.userService.findOneUser(id);
    }

    @Mutation()
    async createUser(@Args("input") input: CreateUserDto) {
        return this.userService.createUser(input);
    }
}
