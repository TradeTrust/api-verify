import { APIGatewayEvent } from "aws-lambda";
import { publicRequestHandler } from "../../middlewares/handlers";
import { verify, isValid } from "@govtechsg/opencerts-verify";
import { config } from "../../config";

const handleVerify = async (event: APIGatewayEvent) => {
    const { document } = JSON.parse(event.body ?? "");
    const fragments = await verify(document, { network: config.network });
    const results = {
        summary: {
          all: isValid(fragments),
          documentStatus: isValid(fragments, ["DOCUMENT_STATUS"]),
          documentIntegrity: isValid(fragments, ["DOCUMENT_INTEGRITY"]),
          issuerIdentity: isValid(fragments, ["ISSUER_IDENTITY"])
        },
        data: fragments
      }
    
    return results;
};

export const handler = publicRequestHandler(handleVerify);

// const middy = require("middy");
// const { cors } = require("middy/middlewares");
// const { verify, isValid } = require("@govtechsg/opencerts-verify");
// const config = require("./config");

// const handleVerify = async (event, _context, callback) => {
//   const { document } = JSON.parse(event.body);
//   try {
//     const fragments = await verify(document, { network: config.network });
//     callback(null, {
//       statusCode: 200,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         summary: {
//           all: isValid(fragments),
//           documentStatus: isValid(fragments, ["DOCUMENT_STATUS"]),
//           documentIntegrity: isValid(fragments, ["DOCUMENT_INTEGRITY"]),
//           issuerIdentity: isValid(fragments, ["ISSUER_IDENTITY"])
//         },
//         data: fragments
//       })
//     });
//   } catch (e) {
//     callback(null, {
//       statusCode: 400,
//       body: e.message
//     });
//   }
// };

// const handler = middy(handleVerify).use(cors());

// module.exports = {
//   handler
// };



// import { APIGatewayEvent } from "aws-lambda";
// import uuid from "uuid/v4";
// import createHttpError from "http-errors";
// import { publicRequestHandler } from "../../middlewares/handlers";
// import { getValidUserByOperatorToken, putAuthorisation, User } from "../../models/user";
// import { getLogger } from "../../common/logger";
// import { config } from "../../config";

// const { info } = getLogger("otpConfirmation");

// export const validateOtp = async (user: User, otp: string) => {
//   // If OTP does not match, we will increment the otp
//   const currentRetryCount = (user.otpRetryCount || 0) + 1;
//   if (currentRetryCount > config.appParameters.maxOtpRetries)
//     throw new createHttpError.BadRequest("maximum number of otp retries reached");

//   if (otp === user.otp && user.otp) return;

//   await putAuthorisation({ ...user, otpRetryCount: currentRetryCount });
//   throw new createHttpError.BadRequest("otp does not match");
// };

// export const handleConfirm = async (event: APIGatewayEvent) => {
//   const { code, phone, otp } = JSON.parse(event.body ?? "");
//   if (!code || typeof code !== "string") throw new createHttpError.BadRequest("code should be a string");
//   const user = await getValidUserByOperatorToken(codevent.body ?? ""e);
//   if (phone !== user.phone && user.phone) throw new createHttpError.BadRequest("phone does not match");
//   if (user.sessionToken) throw new createHttpError.BadRequest("sessionToken has not been invalidated");
//   await validateOtp(user, otp);

//   // Generate session and save
//   const sessionToken = uuid();
//   await putAuthorisation({ ...user, sessionToken, otp: undefined, otpRetryCount: undefined });
//   info(
//     `${JSON.stringify({
//       code: "SESSION_CREATED",
//       phone,
//       operatorToken: user.operatorToken,
//       userReference: user.userReference,
//       sourceIp: event?.requestContext?.identity?.sourceIp
//     })}`
//   );

//   return { sessionToken, ttl: user.validTill };
// };

// export const handler = publicRequestHandler(handleConfirm);