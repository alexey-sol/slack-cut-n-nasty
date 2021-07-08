import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { UserService } from "@root/user/user.service";
import { UserWithDetails } from "@root/user/user.entity";
import extractFromCookie from "@utils/helpers/extractFromCookie";
import { JwtPayload } from "../auth.types";
import { cookieOptions } from "../auth.const";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromExtractors([extractAccessToken]),
            secretOrKey: configService.get<string>("jwt.secret"),
        });
    }

    validate({ sub: userId }: JwtPayload): Promise<UserWithDetails> {
        return this.userService.findUserById(userId);
    }
}

export default function extractAccessToken(req: Request) {
    return extractFromCookie(req, cookieOptions.ACCESS_TOKEN_KEY);
}
