import { useEffect, useState } from "react";

type BatteryStatus = {
  level: number;
  isCharging: boolean;
};

export const useBatteryStatus = () => {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
    level: 0,
    isCharging: false,
  });

  useEffect(() => {
    let batteryPromise;

    if ("getBattery" in navigator) {
      batteryPromise = navigator.getBattery();
    } else if ("battery" in navigator && "Promise" in window) {
      batteryPromise = Promise.resolve(navigator.battery);
    } else {
      return;
    }

    batteryPromise.then(
      (battery: {
        level: number;
        charging: boolean;
        addEventListener: (arg0: string, arg1: { (): void; (): void }) => void;
        removeEventListener: (
          arg0: string,
          arg1: { (): void; (): void }
        ) => void;
      }) => {
        setBatteryStatus({
          level: battery.level,
          isCharging: battery.charging,
        });

        const onChargingChange = () => {
          setBatteryStatus((prevStatus) => ({
            ...prevStatus,
            isCharging: battery.charging,
          }));
        };

        const onLevelChange = () => {
          setBatteryStatus((prevStatus) => ({
            ...prevStatus,
            level: battery.level,
          }));
        };

        battery.addEventListener("chargingchange", onChargingChange);
        battery.addEventListener("levelchange", onLevelChange);

        return () => {
          // Clean up event listeners on component unmount
          battery.removeEventListener("chargingchange", onChargingChange);
          battery.removeEventListener("levelchange", onLevelChange);
        };
      }
    );
  }, []);

  return batteryStatus;
};
