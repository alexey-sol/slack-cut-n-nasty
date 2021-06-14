import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { JoiValidationPipe } from "@utils/pipes";
import { UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./user.dto";
import { UserWithDetails } from "./user.entity";
import { UserService } from "./user.service";
import { createUserDtoSchema } from "./user.validation";

@Resolver("User")
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query()
    async user(
        @Args("id") id?: number,
        @Args("email") email?: string,
    ) {
        let user: UserWithDetails;

        if (id) {
            user = await this.userService.findUserById(id);
        } else if (email) {
            user = await this.userService.findUserByEmail(email);
        }

        return user;
    }

    @Mutation()
    @UsePipes(new JoiValidationPipe(createUserDtoSchema))
    createUser(@Args("input") input: CreateUserDto) {
        return this.userService.createUser(input);
    }
}
