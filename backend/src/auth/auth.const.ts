export const strategyNames = {
    GOOGLE: "google",
    JWT: "jwt",
};

const monthTs = 30 * 24 * 60 * 60 * 1000;

export const cookieOptions = {
    ACCESS_TOKEN_KEY: "access_token",
    EXPIRES_AFTER_MS: monthTs,
    HTTP_ONLY: true,
};
