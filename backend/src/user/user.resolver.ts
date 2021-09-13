import {
    Args, Mutation, Query, Resolver,
} from "@nestjs/graphql";

import { NotFoundInterceptor } from "@utils/providers/validation";
import { UseInterceptors } from "@nestjs/common";
import DeletionSuccess from "@utils/types/DeletionSuccess";

import {
    CreateUserDto, FindUserArgs, UpdateUserDto, UserIdArgs,
} from "./user.dto";

import { UserService } from "./user.service";
import { UserWithDetails } from "./user.entity";

@Resolver("User")
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query()
    @UseInterceptors(NotFoundInterceptor)
    async user(
        @Args() args: FindUserArgs,
    ): Promise<UserWithDetails> {
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
    users(): Promise<UserWithDetails[]> {
        return this.userService.findUsers();
    }

    @Mutation()
    createUser(
        @Args("input") input: CreateUserDto,
    ): Promise<UserWithDetails> {
        return this.userService.createUser(input);
    }

    @Mutation()
    updateUser(
        @Args() { id }: UserIdArgs,
        @Args("input") input: UpdateUserDto,
    ): Promise<UserWithDetails> {
        return this.userService.updateUser(id, input);
    }

    @Mutation()
    deleteUser(
        @Args() { id }: UserIdArgs,
    ): Promise<DeletionSuccess> {
        return this.userService.deleteUserById(id);
    }
}
