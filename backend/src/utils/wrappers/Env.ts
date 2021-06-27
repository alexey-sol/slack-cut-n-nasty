import nodeEnvConst from "@const/nodeEnv";

export class Env {
    constructor(private env = process.env) {}

    isProduction() {
        return this.env.NODE_ENV === nodeEnvConst.PRODUCTION;
    }
}
