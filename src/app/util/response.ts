import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _json = (json: unknown, _options?: unknown) => {
  return new NextResponse(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};
const responseUtil = { json: _json };

export default responseUtil;
