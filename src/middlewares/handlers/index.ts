import middy from "middy";
import { cors } from "middy/middlewares";
import httpSecurityHeaders from "@middy/http-security-headers";
import JSONErrorHandlerMiddleware from "middy-middleware-json-error-handler";
import { withBoundary } from "../withBoundary";

export const publicRequestHandler = (handler: any) =>
  middy(handler)
    .use(cors())
    .use(httpSecurityHeaders())
    .use(JSONErrorHandlerMiddleware())
    .use(withBoundary());
