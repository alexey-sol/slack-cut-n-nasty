import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import DeletionSuccess from "@utils/types/DeletionSuccess";
import { AuthProvider } from "@root/auth/authProvider.entity";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UserDetails } from "../userDetails/userDetails.entity";
import { UserRepository } from "./user.repository";
import { UserWithDetails } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,

        @InjectRepository(UserDetails)
        private detailsRepository: Repository<UserDetails>,

        @InjectRepository(AuthProvider)
        private authProviderRepository: Repository<AuthProvider>,
    ) {}

    findUserById(id: number): Promise<UserWithDetails> {
        return this.userRepository.findById(id);
    }

    findUserByEmail(email: string): Promise<UserWithDetails> {
        return this.userRepository.findByEmail(email);
    }

    findUsers(): Promise<UserWithDetails[]> {
        return this.userRepository.findAll();
    }

    async createUser(
        { details, email, provider }: CreateUserDto,
    ): Promise<UserWithDetails | undefined> {
        const { displayName, fullName, imageUrl } = details;

        const providerRecord = await this.authProviderRepository.findOne({ provider });

        const detailsEntity = this.detailsRepository.create();
        detailsEntity.fullName = fullName;
        detailsEntity.displayName = displayName || fullName;
        detailsEntity.imageUrl = imageUrl;

        const user = this.userRepository.create();
        user.email = email;
        user.joinedWorkspaces = [];
        user.ownWorkspaces = [];
        user.details = detailsEntity;
        user.provider = providerRecord;

        return this.userRepository.save(user);
    }

    async updateUser(
        id: number, { details, ...restForUser }: UpdateUserDto,
    ): Promise<UserWithDetails> {
        const user = await this.findUserById(id);

        Object.entries(restForUser).forEach((entry) => {
            const [key, value] = entry;
            user[key] = value;
        });

        user.details = { ...user.details, ...details };
        return this.userRepository.save(user);
    }

    deleteUserById(id: number): Promise<DeletionSuccess> {
        return this.userRepository.deleteById(id);
    }
}
