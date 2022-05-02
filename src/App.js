import logo from "./logo.svg";
import "./App.css";
import { StereoAudioRecorder, RecordRTCPromisesHandler, invokeSaveAsDialog } from "recordrtc";
import React, { useState } from "react";
function App() {
  const [stream, setStream] = useState(null);
  const [record, setRecord] = useState(null);

  const rtcSession = {
    type: "audio",
    mimeType: "audio/webm;codecs=pcm",
    audio: true,
    // recorderType: StereoAudioRecorder,
    disableLogs: false,
    numberOfAudioChannels: 1,
    desiredSampRate: 16000,
    bufferSize: 16384,
    // sampleRate: 48000,
    // desiredSampleRate: 16000,
    timeSlice: 1000,
  };
  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
  const captureAudio = async () => {
    console.log("시작");

    if (hasGetUserMedia()) {
      // enableNoSleep();
      // Good to go!
      // var noSleep = new NoSleep();

      // document.removeEventListener('click', enableNoSleep, false);
      // await noSleep.enable();

      try {
        let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        let recorder = new RecordRTCPromisesHandler(stream, rtcSession);

        // new Promise.all(noSleepFunc());
        await recorder.startRecording();

        setRecord(recorder);
        setStream(stream);

        // setStart(false);
        // invokeSaveAsDialog(blob);
        // setStream(null);
        // setRecord(null);
      } catch (error) {}
    } else {
      alert("getUserMedia() is not supported by your browser");
    }
  };
  const recordAudio = () => {
    captureAudio();
  };

  const recordReasum = async () => {
    console.log("다시시작");
    // setResumeState(true);
    // setReload(false);

    // setStop(true);

    await record.resumeRecording();
  };
  const [url, setUrl] = useState(null);
  const stoped = async () => {
    console.log("stop");
    // setStream(null);

    // setStop(true);
    // setAudioStoped(false);
    // clearInterval(watchRef.current);
    stream?.stop();

    await record?.stopRecording();
    const blob = await record.getBlob();

    // 만들어진 blob객체 넣기
    setUrl(URL.createObjectURL(blob));

    // invokeSaveAsDialog(blob);
  };
  const recordPause = async () => {
    // setResumeState(false);
    // setReload(true);

    // watchRef.current = setInterval(() => pace(), 11);
    await record.pauseRecording();
  };
  return (
    <div className="App">
      <audio id="audio" src={url} preload="none" controls></audio>
      <button onClick={recordAudio}>레코드 시작</button>
      <button onClick={recordReasum}>레코드 reasum</button>
      <button onClick={recordPause}>레코드 pause</button>
      <button onClick={stoped} className="stop-icon-btn">
        정지
      </button>
    </div>
  );
}

export default App;
