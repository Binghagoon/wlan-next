import { NextRequest, NextResponse } from "next/server";

export type RouteResult<T> = NextResponse<T> | Promise<NextResponse<T>>;

export type RouteHandler<T = unknown> = (
  request: NextRequest,
  context?: { params: Promise<unknown> }
) => RouteResult<T>;

const _json = (json: unknown, options?: { status?: number }) => {
  return new NextResponse(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
    },
    status: options?.status ?? 200,
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
  <T>(
    callback: RouteHandler<T>,
    errorHandler = internalErrorHandler
  ): RouteHandler<T> =>
  (request, context?: { params: Promise<unknown> }) => {
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
