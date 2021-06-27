import { registerAs } from "@nestjs/config";
import { Env } from "@utils/wrappers/Env";

const env = new Env();

export default registerAs("validationPipe", () => ({
    disableErrorMessages: env.isProduction(),
    forbidUnknownValues: true,
}));
