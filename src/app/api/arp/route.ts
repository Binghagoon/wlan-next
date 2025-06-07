import arpService from "@/app/service/arp";
import responseUtil from "@/app/util/response";

export const GET = async () => {
  const table = await arpService.get();
  return responseUtil.json(table);
};
