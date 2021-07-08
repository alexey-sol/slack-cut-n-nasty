export interface GoogleAuthProfile {
    displayName: string;
    emails: {
        value: string;
        verified: boolean;
    }[];
    name: {
        familyName: string;
        givenName: string;
    };
    photos: {
        value: string;
    }[];
}

export interface NormalizedProfile {
    accessToken: string;
    email: string;
    fullName: string;
    imageUrl: string;
}

export interface JwtAccessToken {
    accessToken: string;
}

export interface JwtPayload {
    sub: number; // the user's ID
}
