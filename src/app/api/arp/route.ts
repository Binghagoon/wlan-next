import arpService from "@/service/arp";
import responseUtil from "@/util/response";

export const GET = async () => {
  const table = await arpService.get();
  return responseUtil.json(table);
};
