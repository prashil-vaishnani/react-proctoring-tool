// import { useCallback, useEffect, useRef, useState } from "react";
// import { isMobile } from "react-device-detect";

// export type Status = "on" | "off" | "blocked";

// type Props = {
//   disabled?: boolean;
// };

// export type CamDetectionResult = {
//   webCamStatus: Status | null;
//   videoRef: React.RefObject<HTMLVideoElement>;
//   replayVideo: () => void;
//   requestCam: () => Promise<void>;
//   errorMessage: string | null;
// };

// export function useCamDetection(
//   { disabled }: Props = { disabled: false }
// ): CamDetectionResult {
//   const [webCamStatus, setWebCamStatus] = useState<Status | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const videoRef = useRef<HTMLVideoElement>(null);

//   const getPermissions = () => {
//     navigator.mediaDevices
//       .enumerateDevices()
//       .then((data) => {
//         if (
//           data
//             .filter(({ kind }) => kind === "videoinput")
//             .some(({ label }) => label === "")
//         ) {
//           setWebCamStatus("blocked");
//         } else {
//           if (isMobile) {
//             setWebCamStatus("on");
//           } else {
//             navigator.mediaDevices
//               .getUserMedia({ video: true })
//               .then(() => {
//                 setWebCamStatus("on");
//               })
//               .catch((err) => {
//                 setWebCamStatus("blocked");
//                 setErrorMessage(err.message);
//                 console.error("error", err.message);
//               });
//           }
//         }
//       })
//       .catch((err) => console.error(err));
//   };

//   const requestCam = useCallback(async () => {
//     try {
//       await navigator.mediaDevices.getUserMedia({ video: true });
//     } catch (e) {
//       setErrorMessage("Camera permission blocked");
//       console.error("Camera permission blocked");
//     }

//     getPermissions();
//   },[]);

//   useEffect(() => {
//     let getPermissionsInterval: ReturnType<typeof setInterval>;

//     if (!disabled) {
//       requestCam();
//       getPermissionsInterval = setInterval(getPermissions, 60 * 1000);
//     }

//     return () => {
//       clearInterval(getPermissionsInterval);
//     };
//   }, [disabled, requestCam]);

//   const replayVideo = useCallback(() => {
//     if (disabled) return;

//     const video = videoRef.current;
//     if (webCamStatus === "off") {
//       video?.play();
//       setWebCamStatus("on");
//     }
//   }, [webCamStatus, disabled]);

//   return {
//     webCamStatus,
//     videoRef,
//     replayVideo,
//     requestCam,
//     errorMessage,
//   } as const;
// }