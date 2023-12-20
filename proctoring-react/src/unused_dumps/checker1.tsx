

// import { useRef } from "react";
// const Checker = () => {

//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   async function startCapture(displayMediaOptions: MediaStreamConstraints) {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia(
//         displayMediaOptions
//       );

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play(); /* Change: Use play() instead of autoplay attribute */
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <div>
//       <div>
//         <div>web camera access</div>
//         <button
//           onClick={() => {
//             startCapture({ video: true });
//           }}
//         >
//           allow
//         </button>
//         <video ref={videoRef} autoPlay={true} />{" "}
//         {/* Change: Use autoPlay prop */}
//       </div>
//       <div>
//         <div>microphone access</div>
//         <button>allow</button>
//       </div>
//     </div>
//   );
// };

// export default Checker;