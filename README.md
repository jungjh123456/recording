# Record RTC 를 이용한 녹음 하기

js에는 녹음기능을 하기 위해 navigator 객체에서 미디아를 가져와서 녹음을 할 수 있다.

```js
navigator.mediaDevices.getUserMedia({audio : true}).then(...);
```

이렇게 권한을 얻고 녹음 기능을 만들수 있다.

하지만 더 여러 옵션들을 편리하게 주기 위해 recordRTC라는 라이브러리를 사용하였다.

사용 방법은 간단 하다.

```js
let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
```

이렇게 권한을 가져오고

그렇게 해서 첫번째 콜백에는 stream을 담고 두번째는 옵션을 줄 수 잇다.

```js
let recorder = new RecordRTCPromisesHandler(stream, rtcSession);
```

rtcSession은 녹음에 대한 여러 옵션들을 줄 수 있다.

```js
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
```

이런식으로 오디오 채널이나 버퍼사이즈, 그리고 mimeType까지 줄 수 있다.

```js
await recorder.startRecording();
```

이런식으로 recorder.startRecording()을 하면 녹음이 시작된다.

그리고 저 stream과 recorder를 state에 담아서 저장 한 뒤 await record?.stopRecording();, 이나 await record.pauseRecording(); 을 사용하여 정지,중지, 다시 시작을 구현 할 수 있다.
