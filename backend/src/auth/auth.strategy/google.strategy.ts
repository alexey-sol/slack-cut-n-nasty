import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { GoogleAuthProfile, NormalizedProfile } from "../auth.types";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(private configService: ConfigService) {
        super({
            clientID: configService.get<string>("googleOauth.clientId"),
            clientSecret: configService.get<string>("googleOauth.clientSecret"),
            callbackURL: `${configService.get<string>("server.backendUrl")}`
                + `${configService.get<string>("googleOauth.redirectPath")}`,
            scope: ["email", "profile"],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: GoogleAuthProfile,
        done: VerifyCallback,
    ): Promise<void> {
        const { displayName, emails, photos } = profile;

        const user: NormalizedProfile = {
            accessToken,
            email: emails[0].value,
            fullName: displayName,
            imageUrl: photos[0].value,
        };

        done(null, user);
    }
}
