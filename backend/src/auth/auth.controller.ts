import {
    Controller, Get, Req, UseGuards, Redirect,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "@root/auth/auth.service";
import { GoogleAuthGuard } from "./auth.guards";
import { cookieOptions } from "./auth.const";

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
        const accessTokenKey = cookieOptions.ACCESS_TOKEN_KEY;
        const { user: profile } = req;
        const result = await this.authService.signIn(profile);

        req.res.cookie(accessTokenKey, result.accessToken, {
            expires: new Date(Date.now() + cookieOptions.EXPIRES_AFTER_MS),
            httpOnly: cookieOptions.HTTP_ONLY,
        });

        const origin = this.configService.get<string>("server.frontendUrl");

        return {
            statusCode: 301,
            url: `${origin}/get-started/landing`,
        };
    }
}
