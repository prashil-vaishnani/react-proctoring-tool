import { useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { setEvents } from "../helpers/logger";

export type Status = "on" | "off" | "blocked";

type Props = {
  disabled?: boolean;
};

export type CamDetectionResult = {
  webCamStatus: Status | null;
  micStatus: Status | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  replayVideo: () => void;
  requestCam: () => Promise<void>;
  requestMic: () => Promise<void>;
  errorMessage: string | null;
};

export function useCamDetection(
  { disabled }: Props = { disabled: false }
): CamDetectionResult {
  const [webCamStatus, setWebCamStatus] = useState<Status | null>(null);
  const [micStatus, setMicStatus] = useState<Status | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const getPermissions = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((data) => {
        if (
          data
            .filter(({ kind }) => kind === "videoinput")
            .some(({ label }) => label === "")
        ) {
          setWebCamStatus("blocked");
        } else {
          if (isMobile) {
            setWebCamStatus("on");
          } else {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then(() => {
                setWebCamStatus("on");
              })
              .catch((err) => {
                setWebCamStatus("blocked");
                setErrorMessage(err.message);
                console.error("error", err.message);
              });
          }
        }

        const micPermissionStatus = data
          .filter(({ kind }) => kind === "audioinput")
          .some(({ label }) => label === "")
          ? "blocked"
          : "on";
        setMicStatus(micPermissionStatus);
      })
      .catch((err) => console.error(err));
  };

  const requestCam = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (e) {
      setErrorMessage("Camera permission blocked");
      setEvents("Camera permission blocked")
      console.error("Camera permission blocked");
    }

    getPermissions();
  }, []);

  const requestMic = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      setMicStatus("blocked");
      setErrorMessage("Microphone permission blocked");
      setEvents("Microphone permission blocked")
      console.error("Microphone permission blocked");
    }

    getPermissions();
  }, []);

  useEffect(() => {
    let getPermissionsInterval: ReturnType<typeof setInterval>;

    if (!disabled) {
      requestCam();
      requestMic();
      getPermissionsInterval = setInterval(getPermissions, 60 * 1000);
    }

    return () => {
      clearInterval(getPermissionsInterval);
    };
  }, [disabled, requestCam, requestMic]);

  const replayVideo = useCallback(() => {
    if (disabled) return;

    const video = videoRef.current;
    if (webCamStatus === "off") {
      video?.play();
      setWebCamStatus("on");
    }
  }, [webCamStatus, disabled]);

  return {
    webCamStatus,
    micStatus,
    videoRef,
    replayVideo,
    requestCam,
    requestMic,
    errorMessage,
  } as const;
}
