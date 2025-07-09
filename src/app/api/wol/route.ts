import wolService from "@/app/service/wol";
import responseUtil, { RouteHandler } from "@/app/util/response";

const _POST: RouteHandler = async (request) => {
  const body = await request.json();
  const { mac } = body;
  if (!mac || !wolService.validateMac(mac))
    return responseUtil.json(
      {
        message: "Invalid MAC address",
      },
      { status: 400 }
    );
  const result = await wolService.wake(mac);
  if (result)
    return responseUtil.json(
      { message: "Wake-on-LAN packet sent" },
      { status: 200 }
    );
  else
    return responseUtil.json(
      { message: "Failed to send Wake-on-LAN packet" },
      { status: 500 }
    );
};

export const POST = responseUtil.useInternalError(_POST);
