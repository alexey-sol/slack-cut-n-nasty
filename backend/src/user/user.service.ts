import { FindManyOptions, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto, User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findManyUsers(options: FindManyOptions): Promise<User[]> {
        return this.userRepository.find(options);
    }

    findOneUser(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async createUser(input: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(input);
        return this.userRepository.save(user);
    }
}
