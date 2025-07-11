import wol from "wol";


const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

const wake = (mac: string) =>
  new Promise<boolean>((resolve, reject) => {
    wol.wake(mac, (err, res) => {
      if (err) reject(err);
      else resolve(res!);
    });
  });

const validateMac = (mac: string): boolean => macRegex.test(mac);

const wolService = { wake, validateMac };

export default wolService;
