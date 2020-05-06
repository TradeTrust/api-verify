import { APIGatewayEvent } from "aws-lambda";
import { verify, isValid } from "@govtechsg/oa-verify";
import { publicRequestHandler } from "../../middlewares/handlers";
import { config } from "../../config";

const handleVerify = async (event: APIGatewayEvent) => {
    const document = JSON.parse(event.body ?? "");
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
}

export const handler = publicRequestHandler(handleVerify);
