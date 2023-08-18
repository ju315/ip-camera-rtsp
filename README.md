# IP Camera Stream 테스트

- `node-onvif`: Network에 연결된 IP Camera탐색 라이브러리
- `node-rtsp-stream`: ip camera를 websocket을 통해 스트리밍 하는 라이브러리
  - 기존 라이브러리에서 커스텀.

## 실행방법
> `ffmpeg`이 설치되어 있다고 가정. 만약 환경변수에 등록이 안되어 있다면, `connectStream`함수에서 `ffmpegPath`값을 설정해 주면 된다.
- `npm i`를 통해 필요 패키지들을 다운로드.
- `npm run start`로 js코드 실행.
- `index.html`을 열어서 정상적으로 cctv가 나오는지 확인.