import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@root/user/user.service";
import { JwtAccessToken, NormalizedProfile } from "./auth.types";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(profile: NormalizedProfile): Promise<JwtAccessToken> {
        let user = await this.userService.findUserByEmail(profile.email);

        if (!user) {
            const { email, fullName, imageUrl } = profile;
            const details = { fullName, imageUrl };
            user = await this.userService.createUser({ details, email });
        }

        return {
            accessToken: this.jwtService.sign({ sub: user.id }),
        };
    }
}
