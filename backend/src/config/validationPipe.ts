import { registerAs } from "@nestjs/config";
import nodeEnvConst from "@const/nodeEnv";

const isProduction = process.env.NODE_ENV === nodeEnvConst.PRODUCTION;

export default registerAs("validationPipe", () => ({
    disableErrorMessages: isProduction,
    forbidUnknownValues: true,
}));
