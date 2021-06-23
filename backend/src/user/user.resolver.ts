import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { NotFoundInterceptor } from "@utils/providers/validation";
import { UseInterceptors } from "@nestjs/common";
import { CreateUserDto, DeleteUserArgs, FindUserArgs } from "./user.dto";
import { UserWithDetails } from "./user.entity";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query()
    @UseInterceptors(NotFoundInterceptor)
    async user(@Args() args: FindUserArgs) {
        const { id, email } = args;
        let user: UserWithDetails;

        if (id) {
            user = await this.userService.findUserById(id);
        } else if (email) {
            user = await this.userService.findUserByEmail(email);
        }

        return user;
    }

    @Query()
    users() {
        return this.userService.findUsers();
    }

    @Mutation()
    createUser(@Args("input") input: CreateUserDto) {
        return this.userService.createUser(input);
    }

    @Mutation()
    deleteUser(@Args() { id }: DeleteUserArgs) {
        return this.userService.deleteUserById(id);
    }
}
