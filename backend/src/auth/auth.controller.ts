import {
    Controller, Get, Req, UseGuards, Redirect,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "@root/auth/auth.service";
import providers from "@const/providers";
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
        const origin = this.configService.get<string>("server.frontendUrl");
        const statusCode = 301; // TODO: use http-status?

        const accessTokenKey = cookieOptions.ACCESS_TOKEN_KEY;
        const { user: profile } = req;
        let result;

        try {
            result = await this.authService.signIn(profile, providers.GOOGLE);
        } catch (error) {
            return {
                statusCode,
                url: `${origin}/get-started/error`, // TODO: consider "?message=..."
            };
        }

        req.res.cookie(accessTokenKey, result.accessToken, {
            expires: new Date(Date.now() + cookieOptions.EXPIRES_AFTER_MS),
            httpOnly: cookieOptions.HTTP_ONLY,
        });

        return {
            statusCode,
            url: `${origin}/get-started/landing`,
        };
    }
}
