import {
  FullScreenStatus,
  triggerFullscreen,
  useFullScreenDetection,
} from "./useFullScreenDetection";
import { useTabFocusDetection } from "./useTabFocusDetection";
import { useCopyDisable } from "./useCopyDisable";
import { useDisableContextMenu } from "./useDisableContextMenu";
import { useSelectionDisable } from "./useSelectionDisable";
import { useCamDetection } from "./useCamDetection";
import { useDevToolDetection } from "./useDevToolDetection";
import { useBatteryStatus } from "./useBatteryStatus";

type Props = {
  preventContextMenu?: boolean;
  preventUserSelection?: boolean;
  preventCopy?: boolean;
  forceFullScreen?: boolean;
  preventTabSwitch?: boolean;
  preventDevToolDetection?: boolean;
  preventWebCam?: boolean;
  batteryStatus?: {
    level: number;
    isCharging: boolean;
  };
  isScreenshotDetected?: boolean;
};

export type ProctoringData = {
  fullScreen: { status: FullScreenStatus; trigger: VoidFunction };
  tabFocus: { status: boolean };
};

export function useProctoring({
  preventTabSwitch = false,
  forceFullScreen = false,
  preventContextMenu = false,
  preventUserSelection = false,
  preventCopy = false,
  preventDevToolDetection = false,
  preventWebCam = false,
}: Props) {
  useDisableContextMenu({ disabled: preventContextMenu === false });

  useCopyDisable({ disabled: preventCopy === false });
  useSelectionDisable({ disabled: preventUserSelection === false });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { webCamStatus, videoRef, replayVideo } = useCamDetection({
    disabled: preventWebCam,
  });
  const { level, isCharging } = useBatteryStatus();

  // Disabled devtools detection
  const { devToolsOpen } = useDevToolDetection({
    disabled: preventDevToolDetection,
  });

  const { tabFocusStatus } = useTabFocusDetection({
    disabled: preventTabSwitch === false,
  });
  console.log(tabFocusStatus, "from proctoring");

  const { fullScreenStatus } = useFullScreenDetection({
    disabled: forceFullScreen === false,
  });

  return {
    batteryStatus: { level: level, isCharging: isCharging },
    devToolsOpen: { status: devToolsOpen },
    webCamStatus: { status: webCamStatus },
    fullScreen: { status: fullScreenStatus, trigger: triggerFullscreen },
    tabFocus: { status: tabFocusStatus },
  } as const;
}
