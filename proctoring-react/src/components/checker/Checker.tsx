import { useEffect } from "react";
import { useCamDetection } from "../../hooks/useCamDetection";
import { useBatteryStatus } from "../../hooks/useBatteryStatus";

const Checker = () => {
  const { webCamStatus, micStatus, videoRef, requestCam, requestMic } =
    useCamDetection();
  const { level, isCharging } = useBatteryStatus();
  const allowCamera = async () => {
    try {
      await requestCam();
    } catch (error) {
      console.error("Error requesting camera:", error);
    }
  };

  const allowMicrophone = async () => {
    try {
      await requestMic();
    } catch (error) {
      console.error("Error requesting microphone:", error);
    }
  };

  useEffect(() => {
    allowCamera();
    allowMicrophone();
    if (webCamStatus === "on") {
      console.log("first");
      if (videoRef.current) {
        console.log("dddddd", videoRef.current);
        const stream = new MediaStream();
        console.log("zzzzzzzz", stream);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    }
  }, [webCamStatus, videoRef]);

  return (
    <div>
      <div>
        <div>web camera access : {webCamStatus}</div>
        {webCamStatus === "blocked" && <div>Web camera access is blocked.</div>}
        <video ref={videoRef} autoPlay={true} />
      </div>
      <br />
      <div>
        <div>microphone access : {micStatus}</div>
        {micStatus === "blocked" && <div>Microphone access is blocked.</div>}
      </div>
      <br />
      <div>
        <div>charging level : {level * 100}</div>
        {isCharging && level < 0.5 && <p>please plugedin your device</p>}
      </div>
    </div>
  );
};

export default Checker;
