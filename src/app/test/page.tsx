import arpService from "@/app/service/arp";
import { Card } from "@mui/material";

export default async function Page() {
  const arr = await arpService.get();
  const arr2 = arr.map(({ ip, mac }) => ({ ip, mac }));
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {arr2.map((item, index) => (
          <LanInfoCard key={index} ip={item.ip} mac={item.mac} />
        ))}
      </div>
    </div>
  );
}
function LanInfoCard({ ip, mac }: { ip: string; mac: string }) {
  return (
    <Card variant="outlined" className="p-4">
      <div>
        <strong>IP:</strong> {ip}
      </div>
      <div>
        <strong>MAC:</strong> {mac}
      </div>
    </Card>
  );
}
