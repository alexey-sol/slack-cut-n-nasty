import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { strategyNames as names } from "./auth.const";

@Injectable()
export class GoogleAuthGuard extends AuthGuard(names.GOOGLE) {}

@Injectable()
export class JwtAuthGuard extends AuthGuard(names.JWT) {}
