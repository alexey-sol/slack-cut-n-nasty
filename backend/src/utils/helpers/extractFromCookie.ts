import { Request } from "express";

export default function extractFromCookie(
    { cookies }: Request,
    cookieName: string,
) {
    return cookies[cookieName];
}
