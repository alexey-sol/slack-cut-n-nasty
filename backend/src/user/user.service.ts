import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRepository } from "@user/user.repository";
import { CreateUserDto } from "./user.dto";
import { UserDetails, UserWithDetails } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,

        @InjectRepository(UserDetails)
        private detailsRepository: Repository<UserDetails>,
    ) {}

    findUserById(id: number): Promise<UserWithDetails> {
        return this.userRepository.findById(id);
    }

    findUserByEmail(email: string): Promise<UserWithDetails> {
        return this.userRepository.findByEmail(email);
    }

    createUser({
        displayName, email, fullName, imageUrl,
    }: CreateUserDto): Promise<UserWithDetails> {
        const details = this.detailsRepository.create();
        details.fullName = fullName;
        details.displayName = displayName || fullName;
        details.imageUrl = imageUrl;

        const user = this.userRepository.create();
        user.email = email;
        user.joinedWorkspaces = [];
        user.ownWorkspaces = [];
        user.details = details;

        return this.userRepository.save(user);
    }
}
