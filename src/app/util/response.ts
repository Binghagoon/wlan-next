import { NextRequest, NextResponse } from "next/server";

export type RouteHandler = (
  request?: NextRequest,
  context?: { params: Promise<unknown> }
) => NextResponse | Promise<NextResponse>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _json = (json: unknown, _options?: unknown) => {
  return new NextResponse(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};

const internalErrorHandler = (err: unknown) => {
  console.error(err);
  return new NextResponse("Internal Server Error", {
    status: 500,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

export const useInternalError =
  (callback: RouteHandler, errorHandler = internalErrorHandler): RouteHandler =>
  (request?: NextRequest, context?: { params: Promise<unknown> }) => {
    try {
      const result: unknown = callback(request, context);
      if (result instanceof NextResponse) return result;
      else if (result instanceof Promise) return result.catch(errorHandler);
      else {
        console.error("Invalid response type:", result);
        return new NextResponse("Invalid response type", { status: 500 });
      }
    } catch (err) {
      return errorHandler(err);
    }
  };

const responseUtil = { json: _json, useInternalError };

export default responseUtil;
