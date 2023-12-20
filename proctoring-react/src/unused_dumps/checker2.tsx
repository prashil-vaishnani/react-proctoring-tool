//   const { webCamStatus, videoRef, requestCam, errorMessage } =
  //     useCamDetection();

  //   const allowCamera = async () => {
  //     try {
  //       await requestCam();
  //     } catch (error) {
  //       console.error("Error requesting camera:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     if (webCamStatus === "on") {
  //       if (videoRef.current) {
  //         const stream = new MediaStream();
  //         videoRef.current.srcObject = stream;
  //         videoRef.current.play();
  //       }
  //     }
  //   }, [webCamStatus, videoRef]);

  //   return (
  //     <div>
  //       <div>
  //         <div>web camera access</div>
  //         <button onClick={allowCamera}>allow</button>
  //         {webCamStatus === "blocked" && <div>Web camera access is blocked.</div>}
  //         {errorMessage && <div>Error: {errorMessage}</div>}
  //         <video ref={videoRef} autoPlay={true} />
  //       </div>
  //       <div>
  //         <div>microphone access</div>
  //         <button>allow</button>
  //       </div>
  //     </div>
  //   );