import { useState } from "react";
import { useProctoring } from "./hooks/useProctoring";
import "./App.css";
import Alerts from "./components/Alerts";
import ExamIntro from "./components/Exam/ExamIntro";
import ExamPaused from "./components/Exam/ExamPaused";
import Exam from "./components/Exam";
import { setEvents } from "./helpers/logger";

function App() {
  const [examHasStarted, setExamHasStarted] = useState(false);

  const { fullScreen, tabFocus, devToolsOpen } = useProctoring({
    forceFullScreen: true,
    preventTabSwitch: true,
    preventContextMenu: true,
    preventUserSelection: true,
    preventCopy: true,
    preventDevToolDetection: true, // if true then we can use devtools
    preventWebCam: false,
  });

  if (!examHasStarted) {
    return (
      <ExamIntro
        onClick={() => {
          fullScreen.trigger();
          setTimeout(() => {
            setExamHasStarted(true);
          }, 100);
        }}
      />
    );
  }

  const getContent = () => {
    const errMessageArray = [];
    if (devToolsOpen.status === true) errMessageArray.push("devtool is open");
    if (fullScreen.status === "off") {
      setEvents("full screen mode is off");
      errMessageArray.push("full screen mode is off");
    }
    if (tabFocus.status === false) {
      setEvents("switching to other tabs detected");
      errMessageArray.push("switching to other tabs detected");
    }
    if (errMessageArray.length !== 0) {
      return <ExamPaused errors={errMessageArray} />;
    }
    return <Exam />;
  };

  return (
    <>
      {/* For debugging purpose */}
      {/* <pre>{JSON.stringify({ fullScreen, tabFocus }, null, 2)}</pre> */}
      <div className="test-container">{getContent()}</div>
      <Alerts fullScreen={fullScreen} tabFocus={tabFocus} />
    </>
  );
}

export default App;
