import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@root/user/user.service";
import { Validator } from "class-validator";
import { ClassTransformer } from "class-transformer";
import { CreateUserDto } from "@root/user/user.dto";
import { JwtAccessToken, NormalizedProfile } from "./auth.types";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,

        private validator: Validator,
        private classTransformer: ClassTransformer,
    ) {}

    async signIn(profile: NormalizedProfile, provider: string): Promise<JwtAccessToken> {
        let user = await this.userService.findUserByEmail(profile.email);

        if (!user) {
            const { email, fullName, imageUrl } = profile;
            const details = { fullName, imageUrl };
            const dto = { details, email, provider };

            const entity = this.classTransformer.plainToClass(CreateUserDto, dto);
            const errors = await this.validator.validate(entity);

            if (errors?.length > 0) {
                throw errors;
            }

            user = await this.userService.createUser(dto);
        }

        return {
            accessToken: this.jwtService.sign({ sub: user.id }),
        };
    }
}
