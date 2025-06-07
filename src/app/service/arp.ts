import { getTable, IArpTable } from "@network-utils/arp-lookup";

let table: IArpTable | null = null;

const refreshTable = async () => {
  table = await getTable();
  return table;
};

const get = async () => {
  if (!table) return refreshTable();
  else return table;
};

const arpService = { get, refreshTable };

export default arpService;
