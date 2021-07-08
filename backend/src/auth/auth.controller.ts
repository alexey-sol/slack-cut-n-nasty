import {
    Controller, Get, Req, UseGuards, Redirect,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "@root/auth/auth.service";
import { UserWithDetails } from "@root/user/user.entity";
import { GoogleAuthGuard, JwtAuthGuard } from "./auth.guards";
import { cookieOptions } from "./auth.const";

@Controller("oauth")
export class AuthController {
    @UseGuards(JwtAuthGuard)
    @Get()
    async getSession(@Req() req): Promise<UserWithDetails> {
        return req.user;
    }
}

@Controller("oauth/google")
export class GoogleAuthController {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ) {}

    @UseGuards(GoogleAuthGuard)
    @Get()
    async initAuth(@Req() req) {}

    @UseGuards(GoogleAuthGuard)
    @Get("redirect")
    @Redirect()
    async redirect(@Req() req) {
        const { user: profile } = req;
        const result = await this.authService.signIn(profile);

        const accessTokenKey = cookieOptions.ACCESS_TOKEN_KEY;

        req.res.cookie(accessTokenKey, result.accessToken, {
            expires: new Date(Date.now() + cookieOptions.EXPIRES_AFTER_MS),
            httpOnly: cookieOptions.HTTP_ONLY,
        });

        return {
            url: this.configService.get<string>("server.frontendUrl"),
        };
    }
}
