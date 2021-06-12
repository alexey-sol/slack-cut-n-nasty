import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./user.entity";
import { JoiValidationPipe } from "@utils/pipes";
import { UserService } from "./user.service";
import { createUserDtoSchema } from "./user.validation";

@Resolver("User")
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query()
    async getUser(@Args("id") id: number) {
        return this.userService.findOneUser(id);
    }

    @Mutation()
    @UsePipes(new JoiValidationPipe(createUserDtoSchema))
    async createUser(@Args("input") input: CreateUserDto) {
        return this.userService.createUser(input);
    }
}
